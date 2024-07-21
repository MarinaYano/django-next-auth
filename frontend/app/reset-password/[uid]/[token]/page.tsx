import ResetPassword from "@/components/auth/reset-password";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

interface ResetPasswordPageProps {
  params: {
    uid: string;
    token: string;
  }
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const { uid, token } = params

  const user = await getAuthSession();
  if(user) {
    redirect('/')
  }

  return <ResetPassword uid={uid} token={token} />
}

export default ResetPasswordPage