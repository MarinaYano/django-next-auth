'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";

const items = [
  {
    title: 'profile',
    href: '/settings/profile',
  },
  {
    title: 'change password',
    href: '/settings/password',
  },
]

const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex space-x-2 md:flex-col md:space-x-0 md:space-y-1')}>
      {items.map((item) => (
        <Link
        href={item.href}
        key={item.href}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          pathname === item.href
            ? 'bg-muted hover:bg-muted'
            : 'hover:bg-transparent hover:underline',
          'justify-start'
        )}
      >
        {item.title}
      </Link>
      ))}
    </nav>
  )
}

export default SidebarNav