import { Prisma } from "@prisma/client";

export function getUserData(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    followers: {
      where: {
        followingId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getPostData(loggedInUserId: string) {
  return {
    user: {
      select: getUserData(loggedInUserId),
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostData>;
}>;

export interface PostsPage {
  posts: PostData[];
  hasMore: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
