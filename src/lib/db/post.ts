import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export type PostWithImageUrl = Prisma.PostGetPayload<{
  include: {
    images: true;
  };
}>;

export type PostWithComments = Prisma.PostGetPayload<{
  include: {
    images: true;
    comments: {
      include: {
        author: {
          select: { email: true; name: true; image: true };
        };
      };
    };
  };
}>;

export type CommentsWithAuth = Prisma.CommentGetPayload<{
  include: {
    author: { select: { email: true; name: true; image: true } };
  };
}>;

interface CreatePost {
  title: string;
  urls: string[];
  userId: string;
}

export async function createPost({ title, urls, userId }: CreatePost) {
  try {
    const result = await prisma.post.create({
      data: {
        userId,
        title,
        images: {
          createMany: {
            data: urls.map((url) => ({ url })),
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error("db: createCard error");
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    throw new Error("db: getPosts error");
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        images: true,
        comments: {
          include: {
            author: {
              select: { email: true, name: true, image: true },
            },
          },
        },
      },
    });
    return post;
  } catch (error) {
    throw new Error(`db: getPostById error, id: ${id}`);
  }
}

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({ where: { id: postId } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("prisma error", error);
    }
    throw new Error(`db: deletePost error postId: ${postId}`);
  }
}
