interface ForgotPasswordProps {
  email: string;
}

export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
  const body = JSON.stringify({
    email,
  })

  const apiUrl = process.env.API_URL

  try {
    console.log(body)
    const apiRes = await fetch(`${apiUrl}/api/auth/users/reset-password/`, {
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