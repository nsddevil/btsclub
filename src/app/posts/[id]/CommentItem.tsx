import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentsWithAuth } from "@/lib/db/post";
import CommentDeleteForm from "./CommentDeleteForm";

interface CommentItemProps {
  comment: CommentsWithAuth;
}

export default async function CommentItem({ comment }: CommentItemProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="mt-3 flex items-end gap-2">
      <div className="flex-1 rounded-md border bg-sky-50 p-2">
        <p>{comment.content}</p>
        <div className="flex justify-end">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={comment.author.image ? comment.author.image : ""}
              alt="@shadcn"
            />
            <AvatarFallback>
              {comment.author.name ? comment.author.name.split("")[0] : "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      {user && user.id === comment.authorId && (
        <CommentDeleteForm comment={comment} userId={user.id} />
      )}
    </div>
  );
}
