'use client';

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputType, schema } from "@/actions/auth/forgot-password/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { forgotPassword } from "@/actions/auth/forgot-password";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    }
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const res = await forgotPassword(data);

      if(!res.success) {
        toast({
          title: 'Failed to send email',
          description: res.error
        })
        return;
      }

      setIsForgotPassword(true);
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
      {isForgotPassword ? (
        <>
          <div className="text-center text-2xl font-bold mb-10">password reset</div>
          <div>
            Reset Password email has been sent to your email address
            <br />
            Please reset your password from the email
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='xxxx@gmail.com' {...field} />
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

export default ForgotPassword