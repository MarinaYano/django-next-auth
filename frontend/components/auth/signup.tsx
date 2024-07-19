'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast';
import { InputType, schema } from '@/actions/auth/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { TemporarySignup } from '@/actions/auth';


const Signup = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const form = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const res = await TemporarySignup({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.password,
      })

      if(!res.success) {
        toast({
          title: "Failed to sign up",
          description: `${res.error.detail}`
        })
        return
      }

      setIsSignUp(true);
    } catch (error) {
      toast({
        title: "Failed to sign up"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isSignUp ? (
        <>
          <div className='text-2xl font-bold text-center mb-10'>completed to sign up</div>
          <div>
            sent a mail to verify
          </div>
        </>
      ) : (
        <>
          <div className='text-2xl font-bold text-center mb-10'>Sign Up</div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-3'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                Create an account
              </Button>
            </form>
          </Form>

          <div className='text-center mt-5'>
            <Link href="/login" className='text-sm text-blue-500'>
                Already have an account?
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Signup