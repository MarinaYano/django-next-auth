import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { UserType } from "./types";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

const fetchAPI = async (url: string, options: RequestInit) => {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }

  const res = await fetch(`${apiUrl}${url}`, options);

  if (!res.ok) {
    throw new Error("Failed to fetch API");
  }

  return res.json();
}

// check if accessToken is valid
const verifyAccessToken = async (token: JWT) => {
  return fetchAPI("/api/auth/jwt/verify/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token.accessToken }),
  }).then((res) => res.ok);
}


// update accessToken
const refreshAccessToken = async (token: JWT) => {
  const { access } = await fetchAPI("/api/auth/jwt/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: token.refreshToken }),
  });

  return {
    accessToken: access,
    refreshToken: token.refreshToken,
  }
}

// get a user info
const authorizeUser = async (email: string, password: string) => {
  const session = await fetchAPI("/api/auth/jwt/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const user = await fetchAPI("/api/auth/users/me/", {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `JWT ${session.access}` },
  });

  return {
    ...session,
    user,
  }
}


// setup NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Input both email and password');
        }
        return authorizeUser(credentials.email, credentials.password);
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any}) {
      if (user) {
        return {
          ...token,
          accessToken: user.access,
          refreshToken: user.refresh,
        }
      }

      // check if token is valid and refresh if not
      if(await verifyAccessToken(token)) {
        return token
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }: {session: any; token: JWT}) {
      session.accessToken = token.accessToken;
      return session;
    }
  },
}


// get auth info
export const getAuthSession = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) return null;

  const user = await fetchAPI("/api/auth/users/me/", {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `JWT ${session.accessToken}` },
  });

  const userDate: UserType = {
    ...user,
    accessToken: session.accessToken,
  }

  return userDate;
}