import ForgotPassword from "@/components/auth/forgot-password";
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation";

const ForgotPasswordPage = async () => {
  const user = await getAuthSession();
  if(user) {
    return redirect("/")
  }

  return <ForgotPassword />
}

export default ForgotPasswordPage