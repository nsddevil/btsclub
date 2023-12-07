"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteCard } from "./cardDeleteAction";

interface CardDeleteFormProps {
  imageId: string;
  postId: string;
}

export default function CardDeleteForm({
  imageId,
  postId,
}: CardDeleteFormProps) {
  const deleteCardWithIds = deleteCard.bind(null, { imageId, postId });
  const [state, action] = useFormState(deleteCardWithIds, { message: "" });
  return (
    <CardFooter className="mt-4 flex justify-end">
      <form action={action}>
        <CardDeleteFormButton />
      </form>
    </CardFooter>
  );
}

function CardDeleteFormButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      삭제
    </Button>
  );
}
