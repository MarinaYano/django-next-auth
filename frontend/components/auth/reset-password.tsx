'use client';

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputType, schema } from "@/actions/auth/reset-password/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { resetPassword } from "@/actions/auth/reset-password";
import Link from "next/link";

interface ResetPasswordProps {
  uid: string;
  token: string;
}

const ResetPassword = ({ uid, token }: ResetPasswordProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      repeatedPassword: '',
    }
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const res = await resetPassword({
        uid,
        token,
        password: data.password,
        reNewPassword: data.repeatedPassword
      })

      if(!res.success) {
        toast({
          title: 'Failed to reset your password',
          description: res.error
        })
        return;
      }

      setIsResetPassword(true);
    } catch (error) {
      toast({
        title: 'Failed to reset password'
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-[400px] mx-auto">
      {isResetPassword ? (
        <>
          <div className="text-center text-2xl font-bold mb-10">Password Reset Completed</div>
          <div>
            You completed the password reset process
            <br />
            Please login from the button below
            <div className='text-center mt-5'>
            <Link href="/forgot-password" className='text-sm text-blue-500'>
                Forgot password?
            </Link>
          </div>
          </div>
        </>
      ) : (
        <>
          <div className='text-2xl font-bold text-center mb-10'>Reset Password</div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-3'
            >

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                    <FormLabel>New Password(Confirmation)</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
        </>
      )}
    </div>
  )
}

export default ResetPassword