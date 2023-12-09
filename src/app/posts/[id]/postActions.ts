"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface PostSate {
  message?: string | null;
}

export async function deletePost(
  postId: string,
  prevState: PostSate,
  formData: FormData,
) {
  try {
    await prisma.post.delete({ where: { id: postId } });
  } catch (error) {
    return { message: "포스트 삭제 실패" };
  }
  revalidatePath(`/posts/[id]`, "page");
  redirect(`/`);
}
