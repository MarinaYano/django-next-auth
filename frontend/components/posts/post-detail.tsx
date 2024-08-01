'use client';

import { PostType, UserType } from "@/lib/types";
import { format } from "date-fns";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import Link from "next/link";

interface PostDetailProps {
  post: PostType;
}

const PostDetail = ({ post }: PostDetailProps) => {
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

      <div className="font-bold text-2xl break-words">{post.title}</div>

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