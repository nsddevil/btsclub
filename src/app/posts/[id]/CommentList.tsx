import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentsWithAuth } from "@/lib/db/post";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: CommentsWithAuth[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
