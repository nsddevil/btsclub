import { PostWithImageUrl } from "@/lib/db/post";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface PostItemProps {
  post: PostWithImageUrl;
}

function PostItem({ post }: PostItemProps) {
  return (
    <div>
      <Link href={`/posts/${post.id}`}>
        <Card className="flex flex-col items-center justify-center overflow-hidden shadow-md">
          <Image
            src={post.images[0].url}
            alt={post.title}
            width={500}
            height={500}
            className="w-auto"
          />
          <CardContent>
            <p className="mt-4 font-semibold">{post.title}</p>
          </CardContent>
          <div className="my-2 w-full border-t border-slate-200"></div>
          {post.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 p-2">
              {post.images.slice(1).map((img, i) => (
                <Card key={img.url}>
                  <Image
                    src={img.url}
                    alt={`post.title_${i}`}
                    width={100}
                    height={100}
                    className="w-auto"
                  />
                </Card>
              ))}
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
}
export default PostItem;
