import { getPostDetail } from "@/actions/post";
import PostDetail from "@/components/posts/post-detail";
import { getAuthSession } from "@/lib/nextauth";

interface PostDetailPageProps {
  params: {
    postId: string;
  }
}

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { postId } = params;

  const user = await getAuthSession();

  const { success, post } = await getPostDetail({ postId });

  if(!success) {
    return (
      <div className="text-center text-sm text-gray-500">Failed to fetch a post</div>
    )
  }

  if(!post) {
    return (
      <div className="text-center text-sm text-gray-500">No post</div>
    )
  }

  return <PostDetail post={post} user={user} />
}

export default PostDetailPage