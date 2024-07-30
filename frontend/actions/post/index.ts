'use server';

import { PostType } from "@/lib/types";

export const fetchAPI = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(`${process.env.API_URL}${url}`, options)
    
    if(!res.ok) {
      return { success: false, error: await res.json() }
    }

    const contentType = res.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      return { success: true, data }
    }

    return { success: true }
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Network Error' }
  }
}

export const getPostList = async () => {
  const options: RequestInit = {
    method: 'GET',
    cache: 'no-cache',
  }

  const result = await fetchAPI('/api/post-list/', options);

  if(!result.success) {
    console.log(result.error);
    return { success: false, posts: [] }
  }

  const posts: PostType[] = result.data;
  return { success: true, posts }
}