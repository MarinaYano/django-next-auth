import { getPostList } from "@/actions/post"
import PostItem from "@/components/posts/post-item";


const Home = async () => {
  const { success, posts } = await getPostList();

  if(!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        Failed to fetch posts
      </div>
    )
  }

  if(posts.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">
        No posts
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostItem key={post.uid} post={post} />
      ))}
    </div>
  )
}

export default Home