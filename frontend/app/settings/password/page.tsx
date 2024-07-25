import Password from "@/components/settings/password";
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation";

const PasswordPage = async () => {
  const user = await getAuthSession();
  
  if(!user) {
    redirect('/login');
  }

  return <Password user={user} />;
}

export default PasswordPage