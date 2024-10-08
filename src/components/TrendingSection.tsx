import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";
import { getUserData } from "@/lib/types";
import UserTooltip from "./UserTooltip";

export default function TrendingSection() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto h-8 w-8 animate-spin" />}>
        <FollowSuggestion />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function FollowSuggestion() {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserData(user.id),
    take: 5,
  });

  return (
    <div className="rounded-xl bg-card p-4">
      <h1 className="mb-4 text-xl">You might know</h1>
      {users.map((user) => (
        <div key={user.id}>
          <UserTooltip user={user}>
            <div className="my-2 flex w-full items-center space-x-4">
              <UserAvatar avatarUrl={user.avatarUrl} />
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col text-sm">
                  <Link href={`/users/${user.username}`} key={user.id}>
                    <h2>{user.displayName}</h2>
                    <p>@{user.username}</p>
                  </Link>
                </div>
              </div>
              <FollowButton
                userId={user.id}
                initialState={{
                  followers: user._count?.followers,
                  isFollowedByUser: user.followers.some(
                    ({ followerId }) => followerId === user.id,
                  ),
                }}
              />
            </div>
          </UserTooltip>
        </div>
      ))}
    </div>
  );
}

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

// raw sql query
const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },

  //revalidate cache on server after every 3 hours
  ["trending_topics"],
  {
    revalidate: 1 * 60 * 60, // 1 hr
  },
);
