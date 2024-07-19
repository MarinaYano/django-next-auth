import Signup from "@/components/auth/signup";
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const user = await getAuthSession();

  if(user) {
    redirect('/')
  }

  return <Signup />
}

export default SignupPage