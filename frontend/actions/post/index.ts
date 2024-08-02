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

export const getPostDetail = async ({ postId }: { postId: string }) => {
  const options: RequestInit = {
    method: 'GET',
    cache: 'no-cache',
  }

  const result = await fetchAPI(`/api/post-detail/${postId}/`, options);

  if(!result.success) {
    console.log(result.error);
    return { success: false, post: null }
  }

  const post: PostType = result.data;
  return { success: true, post }
}

interface CreatePostProps {
  accessToken: string;
  title: string;
  content: string;
  image: string | undefined;
}

export const createPost = async ({
  accessToken,
  title,
  content,
  image
}: CreatePostProps) => {
  const body = JSON.stringify({
    title: title,
    content: content,
    image: image,
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
    },
    body,
  }

  const result = await fetchAPI('/api/posts/', options);

  if(!result.success) {
    console.error(result.error);
    return { success: false, post: null }
  }

  const post: PostType = await result.data;

  return { success: true, post }
}

interface UpdatePostProps {
  accessToken: string;
  postId: string;
  title: string;
  content: string;
  image: string | undefined;
}

export const updatePost = async ({
  title,
  content,
  image,
  accessToken,
  postId,
}: UpdatePostProps) => {
  const body = JSON.stringify({
    title: title,
    content: content,
    image: image,
  });

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${accessToken}`,
    },
    body,
  }

  const result = await fetchAPI(`/api/posts/${postId}/`, options);

  if(!result.success) {
    console.error(result.error);
    return { success: false }
  }

  const post: PostType = await result.data;

  return { success: true }
}

interface DeletePostProps {
  accessToken: string;
  postId: string;
}

export const deletePost = async ({
  accessToken,
  postId,
}: DeletePostProps) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `JWT ${accessToken}`,
    },
  }

  const res = await fetchAPI(`/api/posts/${postId}/`, options);

  if(!res.success) {
    console.error(res.error);
    return { success: false }
  }

  return { success: true }
}