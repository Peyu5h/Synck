"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./action";
import UserAvatar from "@/components/UserAvatar";
import { validateRequest } from "@/auth";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";

const Editor = () => {
  const { user } = useSession();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function handleSubmit() {
    await submitPost(input);
    editor?.commands.clearContent();
  }

  return (
    <div>
      <div className="flex w-full gap-5 rounded-2xl bg-card p-5 shadow-2xl">
        <UserAvatar avatarUrl={user.avatarUrl} />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-slate-400 px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="min-w-20"
          disabled={!input.trim()}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default Editor;
