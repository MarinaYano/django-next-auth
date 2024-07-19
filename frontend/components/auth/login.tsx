'use client';

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputType, schema } from "@/actions/auth/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';



const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((result) => {
        if(result?.error) {
          toast({
            title: 'Failed to sign in',
            description: result.error
          })
        } else {
          window.location.href = '/'
        }
      })
      .catch((error) => {
        toast({
          title: 'Failed to sign in'
        })
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <>
          <div className='text-2xl font-bold text-center mb-10'>Login</div>

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

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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

          <div className='text-center mt-5'>
            <Link href="/reset-password" className='text-sm text-blue-500'>
                Forgot password?
            </Link>
          </div>
          <div className='text-center mt-2'>
            <Link href="/login" className='text-sm text-blue-500'>
                Already have an account?
            </Link>
          </div>
        </>
  )
}

export default Login