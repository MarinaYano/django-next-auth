import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { completeSignup } from "@/actions/auth/temporary-signup";

interface CompleteSignupPageProps {
  params: {
    uid: string;
    token: string;
  }
}

const CompleteSignupPage = async ({ params }: CompleteSignupPageProps) => {
  const { uid, token } = params;

  const user = await getAuthSession();

  if(user) {
    redirect('/')
  }

  const res = await completeSignup({ uid, token });

  if(res.success) {
    return (
      <div className="max-w-[400px] m-auto text-center">
        <div className="text-2xl font-bold mb-10">completed to sign up!</div>
        <div>please log in</div>
        <Button asChild className="font-bold">
          <Link href='/login'>
            Login
          </Link>
        </Button>
      </div>
    )
  } else {
    return (
      <div className="max-w-[400px] m-auto text-center">
        <div className="text-2xl font-bold mb-10">You failed to sign up</div>
        <div>Please try to sign up again with the lin below</div>
        <Button asChild className="font-bold">
          <Link href='/signup'>
            Sign Up
          </Link>
        </Button>
      </div>
    )
  }

  
  return (
    <div>page</div>
  )
}

export default CompleteSignupPage