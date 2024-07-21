"use client";

import Post from "@/components/post/Post";
import kyInstance from "@/lib/ky";
import { PostData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

export default function ForYouFeed() {
  const { data, isLoading, isError, error } = useQuery<PostData[]>({
    queryKey: ["post-feed", "for-you"],
    queryFn: kyInstance.get("/api/posts/for-you").json<PostData[]>,
  });

  if (isLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post}>
          {post.content}
        </Post>
      ))}
    </div>
  );
}
