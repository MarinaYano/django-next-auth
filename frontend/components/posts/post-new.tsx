'use client';

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/actions/post";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { UserType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { postSchema, postSchemaType } from "@/actions/post/schema";
import { Textarea } from "../ui/textarea";

interface PostNewProps {
  user: UserType
}

const PostNew = ({ user }: PostNewProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [imageUpload, setImageUpload] = useState<ImageListType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
    }
  });

  const onSubmit: SubmitHandler<postSchemaType> = async (data) => {
    setIsLoading(true);
    let base64Image

    if(ImageUploading.length) {
      base64Image = imageUpload[0].dataURL
    }

    try {
      const res = await createPost({
        accessToken: user.accessToken,
        title: data.title,
        content: data.content,
        image: base64Image,
      })

      if(!res.success || !res.post) {
        toast({
          title: 'Error',
        })
        return;
      }

      toast({
        title: 'Successfully created post',
      })
      router.push(`/post/${res.post.uid}`);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Failed to create post',
      })
    } finally {
      setIsLoading(false);
    }
  }

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0].file;
    const maxFileSize = 1024 * 1024 * 2;

    if(file && file.size > maxFileSize) {
      toast({
        title: 'File size must be less than 2MB',
      })
      return;
    }

    setImageUpload(imageList);
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-5">New Post</div>

      <Form {...form}>
        <div className="mb-3">
          <FormLabel>Thumbnail</FormLabel>
          <div className="mt-2">
            <ImageUploading
              value={imageUpload}
              onChange={onChangeImage}
              maxNumber={1}
              acceptType={['jpg', 'jpeg', 'png']}
            >
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div className="w-full">
                  {imageList.length === 0 && (
                    <button
                      onClick={onImageUpload}
                      {...dragProps}
                      className="w-full border-2 border-dashed rounded-md h-32 hover:bg-gray-50 mb-3"
                    >
                      <div className="text-gray-400 font-medium mb-2">Select a file or drag and drop</div>
                      <div className="text-gray-400 text-xs">File: jpg / jpeg / png</div>
                      <div className="text-gray-400 text-xs">File size: up tp 2MB</div>
                    </button>
                  )}

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

export default PostNew