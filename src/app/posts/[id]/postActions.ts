"use server";

import { revalidatePath } from "next/cache";
import { deletePost as testDeletePost } from "@/lib/db/post";

interface PostSate {
  message?: string | null;
}

export async function deletePost(
  postId: string,
  prevState: PostSate,
  formData: FormData,
) {
  try {
    await testDeletePost(postId);
    revalidatePath(`/posts/[id]`, "page");
    return { message: "포스트 삭제 성공" };
  } catch (error) {
    console.log(error);
    return { message: "포스트 삭제 실패" };
  }
}
