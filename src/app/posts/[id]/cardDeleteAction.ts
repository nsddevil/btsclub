"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface State {
  message?: string | null;
}

interface DeleteCardInput {
  imageId: string;
  postId: string;
}
export async function deleteCard(
  { imageId, postId }: DeleteCardInput,
  prevState: State,
  formData: FormData,
) {
  try {
    await prisma.image.delete({ where: { id: imageId } });
  } catch (error) {
    return {
      message: "이미지 삭제 실패",
    };
  }
  revalidatePath(`/posts/[id]`, "page");
  redirect(`/posts/${postId}`);
}
