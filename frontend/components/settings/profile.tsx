'use client';

import { updateUser } from "@/actions/user/edit-detail";
import { editDetailSchema, EditDetailType } from "@/actions/user/edit-detail/schema";
import { UserType } from "@/lib/nextauth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

interface ProfileProps {
  user: UserType;
}

const Profile = ({ user }: ProfileProps) => {
  const{ toast } = useToast();
  const router = useRouter();
  const [avatarUpload, setAvatarUpload] = useState<ImageListType>([
    { dataURL: user.avatar || '/default.jpg' },
  ])
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditDetailType>({
    resolver: zodResolver(editDetailSchema),
    defaultValues: {
      name: user.name || '',
      introduction: user.introduction || '',
    }
  })

  const onSubmit: SubmitHandler<EditDetailType> = async (data) => {
    setIsLoading(true);
    let base64Image

    if(
      avatarUpload[0].dataURL &&
      avatarUpload[0].dataURL.startsWith('data:image')
    ) {
      base64Image = avatarUpload[0].dataURL
    }

    try {
      const res = await updateUser({
        accessToken: user.accessToken,
        name: data.name,
        introduction: data.introduction,
        avatar: base64Image,
      })

      if(!res.success) {
        toast({
          title: 'Failed to edit profile',
        })
        return
      }

      toast({
        title: 'Profile edited successfully',
      })
      router.refresh();
    } catch (error) {
      toast({
        title: 'Failed to edit profile',
      })
    } finally {
      setIsLoading(false);
    }
  }

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file
    const maxFileSize = 2 * 1024 * 1024

    if(file && file.size > maxFileSize) {
      toast({
        title: 'Image size must be less than 2MB',
      })
      return
    }

    setAvatarUpload(imageList)
  }

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">Profile</div>

      <>
        <div className='text-2xl font-bold text-center mb-10'>Reset Password</div>

          <Form {...form}>
            <div className="mb-5">
              <ImageUploading
                value={avatarUpload}
                onChange={onChangeImage}
                maxNumber={1}
                acceptType={['jpg', 'jpeg', 'png']}
              >
                {({ imageList, onImageUpdate }) => (
                  <div className="w-full flex flex-col items-center justify-center">
                    {imageList.map((image: any) => (
                      <div key={image.dataURL}>
                        {image.dataURL && (
                          <div className="w-24 h-24 relative">
                            <Image
                              src={image.dataURL}
                              alt="avatar"
                              fill
                              className="rounded-full object-cover"
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
                          Change avatar
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </ImageUploading>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input value={user.email} disabled />
              </FormItem>

              <FormField
                control={form.control}
                name='introduction'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Introduction</FormLabel>
                    <FormControl>
                      <Input placeholder='Introduction' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type='submit'
                className="w-full"
              >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Submit
              </Button>
            </form>
          </Form>
        </>

    </div>
  )
}

export default Profile