import { Card } from "@/components/ui/card";
import { getPostById } from "@/lib/db/post";
import Image from "next/image";
import { notFound } from "next/navigation";
import CommentForm from "./CommentForm";
import { auth } from "@/auth";
import CommentList from "./CommentList";
import { Button } from "@/components/ui/button";
import CardDeleteForm from "./CardDeleteForm";

interface PostsPageProps {
  params: {
    id: string;
  };
}

export default async function PostsPage({ params: { id } }: PostsPageProps) {
  const session = await auth();
  const post = await getPostById(id);
  if (!post) notFound();
  return (
    <div className="mt-6 min-h-[90vh] p-4">
      <div className="grid grid-cols-1 gap-4">
        <h1 className="py-4 text-center text-xl font-bold">{post.title}</h1>
        {post.images.map((img, i) => (
          <Card key={img.url}>
            <Image
              src={img.url}
              alt={`${post.title}_${i + 1}`}
              width={600}
              height={600}
              className="w-auto"
            />
            {session?.user.role === "ADMIN" && (
              <CardDeleteForm imageId={img.id} postId={post.id} />
            )}
          </Card>
        ))}
      </div>
      <CommentList comments={post.comments} />
      {session && (
        <div className="mt-6">
          <CommentForm postId={post.id} authorId={session.user.id} />
        </div>
      )}
    </div>
  );
}
