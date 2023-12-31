"use server";

import { auth } from "@/auth";
import { createPost } from "@/lib/db/post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface PostFormState {
  errors?: {
    title?: string[];
    images?: string[];
  };
  message?: string;
}

const CardSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력하세요" }),
  images: z.any().refine((file: File) => file.size !== 0, {
    message: "이미지를 넣어주세요",
  }),
});

export async function addPost(prevState: PostFormState, formData: FormData) {
  const session = await auth();
  if (!session || !session.user)
    return {
      message: "권한이 없습니다.",
    };

  const validateField = CardSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateField.success) {
    return {
      errors: validateField.error.flatten().fieldErrors,
      message: "필드를 확인하세요",
    };
  }

  const { title } = validateField.data;
  try {
    const res = await fetch(
      `http://${process.env.IMAGE_SERVER_URL}/images/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = (await res.json()) as { imagesUrl: string[] };
    await createPost({
      title: title ?? "빈 제목",
      urls: result.imagesUrl,
      userId: session.user.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "fetch failed") {
        return {
          message: "image server error",
        };
      }
    }
    return {
      message: "이미지 저장 실패",
    };
  }
  revalidatePath("/");
  redirect("/");
  // return undefined;
}
