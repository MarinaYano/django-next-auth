'use server';

interface ResetPasswordProps {
  uid: string;
  token: string;
  password: string;
  reNewPassword: string;
}


export const resetPassword = async ({
  uid,
  token,
  password,
  reNewPassword
}: ResetPasswordProps) => {
  try {
    const body = JSON.stringify({
      uid,
      token,
      new_password: password,
      re_new_password: reNewPassword
    })

    const apiUrl = process.env.API_URL
    console.log(apiUrl)

    const apiRes = await fetch(`${apiUrl}/api/auth/users/reset_password_confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if(!apiRes.ok) {
      return { success: false, error: await apiRes.json() }
    }
  
    return { success: true }

  } catch (error) {
    console.error(error)
    return { success: false }
  }
}