import Editor from "@/components/post/editor/Editor";
import Post from "@/components/post/Post";
import TrendingSection from "@/components/TrendingSection";
import prisma from "@/lib/prisma";
import React from "react";
import ForYouFeed from "./ForYouFeed";

const Page = async () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Editor />

        <ForYouFeed />
      </div>
      <TrendingSection />
    </main>
  );
};

export default Page;
