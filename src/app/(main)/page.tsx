import Editor from "@/components/post/editor/Editor";
import Post from "@/components/post/Post";
import TrendingSection from "@/components/TrendingSection";
import prisma from "@/lib/prisma";
import React from "react";

const Page = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Editor />

        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <TrendingSection />
    </main>
  );
};

export default Page;
