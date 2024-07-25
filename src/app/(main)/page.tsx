import Editor from "@/components/post/editor/Editor";
import Post from "@/components/post/Post";
import TrendingSection from "@/components/TrendingSection";
import prisma from "@/lib/prisma";
import React from "react";
import ForYouFeed from "./ForYouFeed";
import FollowingFeed from "./FollowingFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full space-y-5">
        <Editor />

        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendingSection />
    </main>
  );
};

export default Page;
