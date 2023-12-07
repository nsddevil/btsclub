import { getPosts } from "@/lib/db/post";
import PostItem from "./PostItem";

export default async function PostList() {
  const posts = await getPosts();
  return (
    <div className="p-4">
      <h1 className="my-6 text-center text-2xl font-bold">대회 사진</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
