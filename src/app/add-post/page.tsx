import AddPostForm from "./AddPostForm";

export default async function AddPost() {
  return (
    <div className="min-h-[90vh] p-4">
      <h1 className="my-4 text-2xl font-bold">이미지 업로드</h1>
      <AddPostForm />
    </div>
  );
}
