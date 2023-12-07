"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { createComment } from "./commentActions";
import { Loader2 } from "lucide-react";
import { useRef } from "react";

interface CommentFormProps {
  authorId: string;
  postId: string;
}

export default function CommentForm({ authorId, postId }: CommentFormProps) {
  const withAction = createComment.bind(null, { authorId, postId });
  const [state, action] = useFormState(withAction, { errors: {}, message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await action(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-2"
    >
      <div>
        <Textarea name="comment" placeholder="Comment.." />
        {state?.errors?.comment &&
          state?.errors.comment.map((err) => (
            <p key={err} className="text-red-500">
              {err}
            </p>
          ))}
      </div>
      <div className="flex justify-end">
        <CommentFormButton />
      </div>
    </form>
  );
}

function CommentFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="px-6" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      등록
    </Button>
  );
}
