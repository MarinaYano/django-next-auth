'use client';

import { PostType, UserType } from "@/lib/types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePost } from "@/actions/post";
import { useToast } from "../ui/use-toast";

interface PostDetailProps {
  post: PostType;
  user: UserType | null;
}

const PostDetail = ({ post, user }: PostDetailProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = async () => {
    setIsLoading(true);

    if(post.user.uid !== user?.uid) {
      toast({
        title: 'You cannot delete this post',
      })
      return;
    }

    try {
      const res = await deletePost({
        accessToken: user?.accessToken,
        postId: post.uid,
      });

      if(!res.success) {
        toast({
          title: 'Failed to delete post',
        })
      }

      toast({
        title: 'Successfully deleted post',
      })
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to delete post',
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="aspect-[16/9] relative">
        <Image
          src={post.image || "/no-post.png"}
          alt="thumbnail"
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl break-words">{post.title}</div>
        {post.user.uid === user?.uid && (
          <div className="flex items-center justify-end space-x-1">
            <Link href={`${post.uid}/edit`}>
              <div className="hover:bg-gray-100 p-2 rounded-full">
                <Pencil className="w-5 h-5" />
              </div>
            </Link>
            <button
              type="button"
              onClick={handleDeletePost}
              disabled={isLoading}
              className="hover:bg-gray-100 p-2 rounded-full"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Link href={`user/${post.user.uid}`}>
            <div className="relative w-12 h-12">
              <Image
                src={post.user.avatar || "/default.jpg"}
                alt={post.user.name || 'avatar'}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </Link>
          <div>
            <div className="text-sm hover:underline break-words">
              <Link href={`user/${post.user.uid}`}>{post.user.name}</Link>
            </div>
            <div className="text-xs text-gray-400">
              {format(new Date(post.updated_at), "yyyy/MM/dd HH:mm")}
            </div>
          </div>
        </div>
      </div>

      <div className="leading-relaxed break-words whitespace-pre-wrap">{post.content}</div>

    </div>
  )
}

export default PostDetail