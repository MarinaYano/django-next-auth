'use server';

import { UserDetailType } from "../get-detail";

interface UpdateUserProps {
  accessToken: string;
  name: string;
  introduction: string;
  avatar: string;
}
export const updateUser = async ({
  accessToken,
  name,
  introduction,
  avatar
}: UpdateUserProps) => {
  const body = JSON.stringify({
    accessToken,
    name,
    introduction,
    avatar,
  })

  const apiUrl = process.env.API_URL;

  try {
    const res = await fetch(`${apiUrl}/api/auth/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `JWT ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body,
    })
  
    if(!res.ok) {
      return {
        success: false,
        user: null,
      }
    }

    const user: UserDetailType = await res.json();

    return {
      success: true,
      user,
    }
  } catch (error) {
    return {
      success: false,
      user: null,
    }
  }
}