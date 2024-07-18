'use client';

import { UserType } from "@/lib/nextauth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserNavigationProps {
  user: UserType;
}

const UserNavigation = ({ user }: UserNavigationProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={user.avatar || "default.png"}
            alt={user.name || "avatar"}
            fill
            className="rounded=full object-cover"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-2 w-[300px]" align="end">
        <Link href={`/user/${user.uid}`}>
          <DropdownMenuItem className="cursor-pointer">
            <div className="break-words">
              <div className="mb-2">{user.name}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="/post/new">
          <DropdownMenuItem className="cursor-pointer">
            Create Post
          </DropdownMenuItem>
        </Link>

        <Link href="/settings/profile">
          <DropdownMenuItem className="cursor-pointer">
            Account Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onSelect={async () => { await signOut({ callbackUrl: "/" }) }}
          className="text-red-600 cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNavigation