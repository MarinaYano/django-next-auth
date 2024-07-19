'use server';

interface TemporarySignupProps {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

export const TemporarySignup = async ({
  name,
  email,
  password,
  rePassword,
}: TemporarySignupProps) => {
  const body = JSON.stringify({
    name,
    email,
    password,
    re_password: rePassword,
  })

  const apiUrl = process.env.API_URL

  try {
    console.log(body)
    const apiRes = await fetch(`${apiUrl}/api/auth/users/`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body,
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