'use server';

interface UpdatePasswordProps {
  accessToken: string;
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export const updatePassword = async ({
  accessToken,
  currentPassword,
  newPassword,
  reNewPassword,
}: UpdatePasswordProps) => {
  try {
    const body = JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
      re_new_password: reNewPassword,
    })

    const res = await fetch(`${process.env.API_URL}/api/auth/users/set_password/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body,
    })

    if(!res.ok) {
      return {
        success: false,
      }
    };

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}