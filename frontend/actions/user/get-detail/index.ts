'use server';

export interface UserDetailType {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  introduction: string;
  created_at: string;
}

interface GetUserDetailProps {
  userId: string;
}

export const getUserDetail = async ({ userId }: GetUserDetailProps) => {
  const apiUrl = process.env.API_URL

  try {
    const apiRes = await fetch(`${apiUrl}/api/users/${userId}`, {
      method: 'GET',
      cache: 'no-cache',
    })

    if(!apiRes.ok) {
      return { success: false, error: await apiRes.json() }
    }
  
    return { success: true, user: await apiRes.json() }

  } catch (error) {
    console.error(error)
    return { success: false }
  }
}