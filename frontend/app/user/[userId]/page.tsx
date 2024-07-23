import { getUserDetail } from "@/actions/user/get-detail";
import UserDetail from "@/components/user/user-detail";

interface UserDetailPageProps {
  params: {
    userId: string;
  }
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  const { userId } = params;

  const { success, user } = await getUserDetail({ userId });

  if(!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        Failed to get user detail
      </div>
    )
  }

  if(!user) {
    return (
      <div className="text-center text-sm text-gray-500">
        User not found
      </div>
    )
  }

  return <UserDetail user={user} />
}

export default UserDetailPage