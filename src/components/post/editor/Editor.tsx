"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./action";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import { useSubmitPostMutation } from "../mutation";
import LoadingButton from "@/components/LoadingButton";

const Editor = () => {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();

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

  function handleSubmit() {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  }

  return (
    <div className="flex flex-col gap-y-4 rounded-2xl bg-card p-5 shadow-2xl">
      <div className="flex w-full gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-slate-200 px-5 py-3 dark:bg-zinc-700"
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          className="min-w-20"
          loading={mutation.isPending}
          disabled={!input.trim()}
          onClick={handleSubmit}
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default Editor;
