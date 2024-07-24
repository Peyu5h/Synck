"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import PostsLoadingSkeleton from "@/components/post/LoadingSkeleton";
import Post from "@/components/post/Post";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostData, PostsPage } from "@/lib/types";
import { useInfiniteQuery, useIsFetching } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

export default function ForYouFeed() {
  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam = null }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),

    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.hasMore,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (isLoading) {
    return <PostsLoadingSkeleton />;
  }

  if (isSuccess && !posts.length && !hasNextPage) {
    return <div className="">No Posts</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <InfiniteScroll
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post}>
          {post.content}
        </Post>
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
    </InfiniteScroll>
  );
}
