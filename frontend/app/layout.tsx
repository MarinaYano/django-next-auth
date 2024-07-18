import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/auth/navigation";
import { getAuthSession } from "@/lib/nextauth";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Django + Next.js Tutorial",
  description: "Django + Next.js Tutorial",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation user={user} />

            <main className="container mx-auto max-w-screen-md flex-1 px-2">
              {children}
            </main>
            <footer>
              <div className="text-center my-3">
                Copyright &copy; All rights reserved              
              </div>
            </footer>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
