interface ForgotPasswordProps {
  email: string;
}

export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
  const body = JSON.stringify({
    email,
  })

  try {
    const apiRes = await fetch(`http://localhost:8000/api/auth/users/reset_password/`, {
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