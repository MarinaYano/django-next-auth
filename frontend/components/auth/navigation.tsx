'use client';

import { UserType } from "@/lib/nextauth";
import Link from "next/link";
import UserNavigation from "./user-navigation";
import { Button } from "../ui/button";

interface NavigationProps {
  user: UserType | null;
}

const Navigation = ({ user }: NavigationProps) => {
  return (
    <header className="shadow-lg shadow-gray-100 mb-10 py-4">
      <div className="container mx-auto flex max-w-screen-md items-center justify-between">
        <Link
          href='/'
          className="cursor-pointer text-xl font-bold"
        >
          Django + Next.js Tutorial
        </Link>

        {user ? (
          <div>
            <UserNavigation user={user} />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              asChild
              variant='ghost'
              className="font-bold"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              variant='ghost'
              className="font-bold"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation