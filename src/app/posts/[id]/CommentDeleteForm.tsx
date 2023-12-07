"use client";

import { Button } from "@/components/ui/button";
import { deleteComment } from "./commentActions";
import { useFormState, useFormStatus } from "react-dom";
import { CommentsWithAuth } from "@/lib/db/post";
import { Loader2 } from "lucide-react";

interface CommentDeleteFormProps {
  comment: CommentsWithAuth;
  userId?: string;
}

export default function CommentDeleteForm({
  comment,
  userId,
}: CommentDeleteFormProps) {
  const deleteWithAuthor = deleteComment.bind(null, {
    comment,
    userId: userId,
  });
  const [state, action] = useFormState(deleteWithAuthor, { message: "" });
  return (
    <form action={action}>
      <CommentDeleteButton />
    </form>
  );
}

function CommentDeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      className="mt-4"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      삭제
    </Button>
  );
}
