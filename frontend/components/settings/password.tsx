'use client';

import { UserType } from "@/lib/nextauth"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { UpdatePasswordInputType, updatePasswordSchema } from "@/actions/user/update-password/schema";
import { updatePassword } from "@/actions/user/update-password";

const Password = ({ user }: { user: UserType }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<UpdatePasswordInputType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      repeatedPassword: '',
    },
  })

  const onSubmit: SubmitHandler<UpdatePasswordInputType> = async (data) => {
    setIsLoading(true);

    try {
      const res = await updatePassword({
        accessToken: user.accessToken,
        currentPassword: data.currentPassword,
        newPassword: data.password,
        reNewPassword: data.repeatedPassword,
      })

      if(!res.success) {
        toast({
          title: 'Failed to update password',
        })
      }

      toast({
        title: 'Password updated',
      })
      form.reset();
    } catch (error) {
      toast({
        title: 'Failed to update password',
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">Change Password</div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5'
        >

          <FormField
            control={form.control}
            name='currentPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='repeatedPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password (Confirmation)</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
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
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Password