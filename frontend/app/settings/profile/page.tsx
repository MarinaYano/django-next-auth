import Profile from "@/components/settings/profile";
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await getAuthSession();

  if(!user) {
    redirect('/login')
  }

  return <Profile user={user} />
}

export default ProfilePage