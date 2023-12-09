"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { deletePost } from "./postActions";

interface PostDeleteFormProps {
  postId: string;
}

export default function PostDeleteForm({ postId }: PostDeleteFormProps) {
  const deletePostWithId = deletePost.bind(null, postId);
  const [state, action] = useFormState(deletePostWithId, { message: "" });
  return (
    <form action={action}>
      <PostDeleteFormButton />
      {state?.message && (
        <p className="font-bold text-red-600">{state.message}</p>
      )}
    </form>
  );
}

function PostDeleteFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" variant="destructive">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <Trash2 className="mr-2 h-4 w-4" />
      포스트 삭제
    </Button>
  );
}
