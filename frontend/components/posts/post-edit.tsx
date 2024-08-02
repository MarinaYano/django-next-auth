'use client';

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostType, UserType } from "@/lib/types";
import { postSchema, postSchemaType } from "@/actions/post/schema";
import { updatePost } from "@/actions/post";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from "../ui/textarea";
import { Loader2 } from 'lucide-react';

interface PostEditProps {
  post: PostType;
  user: UserType;
}

const PostEdit = ({ post, user }: PostEditProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: post.image || "/no-post.png",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<postSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    }
  });

  const onSubmit: SubmitHandler<postSchemaType> = async (data) => {
    setIsLoading(true);
    let base64Image;

    if(
      imageUpload[0].file &&
      imageUpload[0].dataURL?.startsWith('data:image')
    ) {
      base64Image = imageUpload[0].dataURL;
    }

    try {
      const res = await updatePost({
        accessToken: user.accessToken,
        postId: post.uid,
        title: data.title,
        content: data.content,
        image: base64Image,
      })

      if(!res.success) {
        toast({
          title: 'Failed to update the post',
        })
        return;
      }

      toast({
        title: 'Post updated',
      })
      router.push(`/post/${post.uid}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0].file;
    const maxFileSize = 1024 * 1024 * 2;

    if(file && file.size > maxFileSize) {
      toast({
        title: 'Image size is too large',
      })
      return;
    }

    setImageUpload(imageList);
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-5">Edit Post</div>

      <Form {...form}>
        <div className="mb-5">
          <FormLabel>Thumbnail</FormLabel>
          <div className="mt-2">
            <ImageUploading
              value={imageUpload}
              onChange={onChangeImage}
              maxNumber={1}
              acceptType={['jpg', 'jpeg', 'png']}
            >
              {({ imageList, onImageUpdate }) => (
                <div className="w-full">
                  {imageList.map((image, index) => (
                    <div key={index}>
                      {image.dataURL && (
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={image.dataURL}
                            alt="thumbnail"
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {imageList.length > 0 && (
                    <div className="text-center mt-3">
                      <Button
                        variant='outline'
                        onClick={() => onImageUpdate(0)}
                      >
                        Change Thumbnail
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='title of your post' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="content of your post" {...field} rows={15} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            type='submit'
            className='w-full'
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Submit
          </Button>
        </form>
      </Form>

    </div>
  )
}

export default PostEdit