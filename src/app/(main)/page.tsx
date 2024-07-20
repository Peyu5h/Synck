import Editor from "@/components/post/editor/Editor";
import React from "react";

const Page = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Editor />
      </div>
    </main>
  );
};

export default Page;
