"use server";

import { CommentsWithAuth } from "@/lib/db/post";
import prisma from "@/lib/db/prisma";
import { Comment, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

interface CommentState {
  errors?: {
    comment?: string[];
  };
  message?: string;
}

type CommentInput = Pick<Comment, "postId" | "authorId">;

const CommentSchema = z.object({
  comment: z.string().min(1, { message: "댓글을 입력하세요." }),
});

export async function createComment(
  commentInput: CommentInput,
  prevState: CommentState,
  formData: FormData,
) {
  const validField = CommentSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validField.success) {
    return {
      errors: validField.error.flatten().fieldErrors,
      message: "모든 필드를 올바르게 작성하세요",
    };
  }
  const { comment } = validField.data;
  try {
    await prisma.comment.create({
      data: {
        postId: commentInput.postId,
        authorId: commentInput.authorId,
        content: comment,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: createComment",
    };
  }
  revalidatePath("/posts/[id]", "page");
  redirect(`/posts/${commentInput.postId}`);
}

interface DeleteComment {
  comment: CommentsWithAuth;
  userId?: string;
}

export async function deleteComment(
  { comment, userId }: DeleteComment,
  prevState: { message?: string },
  formData: FormData,
) {
  if (comment.authorId !== userId) {
    return {
      message: "권한이 없습니다.",
    };
  }
  try {
    await prisma.comment.delete({ where: { id: comment.id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        message: error.message,
      };
    }
    return {
      message: "Database Error: deleteComment",
    };
  }
  revalidatePath("/posts/[id]", "page");
  redirect(`/posts/${comment.postId}`);
}
