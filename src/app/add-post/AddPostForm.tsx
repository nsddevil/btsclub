"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addPost } from "./addPostActions";
import UploadInput from "./UploadInput";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function AddPostForm() {
  const [state, action] = useFormState(addPost, {
    errors: {},
    message: "",
  });
  return (
    <div>
      <form action={action} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">제목</Label>
          <Input type="text" id="title" name="title" placeholder="Title" />
          {state?.errors?.title &&
            state?.errors.title.map((err) => (
              <p key={err} className="my-2 text-sm text-red-600">
                {err}
              </p>
            ))}
        </div>
        <UploadInput />
        {state?.errors?.images &&
          state?.errors.images.map((err) => (
            <p key={err} className="my-2 text-sm text-red-600">
              {err}
            </p>
          ))}
        {state?.message && <p className="text-red-600">{state.message}</p>}
        <AddPostFormButton />
      </form>
    </div>
  );
}

function AddPostFormButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 등록하기
    </Button>
  );
}
