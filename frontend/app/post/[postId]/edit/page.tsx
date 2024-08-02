import { getPostDetail } from "@/actions/post";
import PostEdit from "@/components/posts/post-edit";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

interface PostEditPageProps {
  params: {
    postId: string;
  }
}

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const { postId } = params;

  const user = await getAuthSession();

  if(!user) {
    redirect('/login');
  }

  const { success, post } = await getPostDetail({ postId });

  if(!success) {
    return (
      <div className="text-center text-sm text-gray-500">Failed to fetch the post details</div>
    )
  }

  if(!post) {
    return (
      <div className="text-center text-sm text-gray-500">No post</div>
    )
  }

  if(post.user.uid !== user.uid) {
    return <div className="text-center">Unauthorized to edit this post</div>
  }

  return <PostEdit post={post} user={user} />
}

export default PostEditPage