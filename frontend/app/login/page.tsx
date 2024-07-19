import Login from "@/components/auth/login"
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getAuthSession();

  if(user) {
    redirect('/')
  }
  
  return <Login />
}

export default LoginPage