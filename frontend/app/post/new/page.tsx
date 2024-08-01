import PostNew from "@/components/posts/post-new";
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation";

const NewPostPage = async () => {
  const user = await getAuthSession();
  if(!user) {
    redirect("/login");
  }

  return <PostNew user={user} />
}

export default NewPostPage