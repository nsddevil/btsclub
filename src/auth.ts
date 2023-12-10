import NextAuth from "next-auth";
import prisma from "./lib/db/prisma";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "USER",
        };
      },
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.properties.nickname,
          image: profile.properties.profile_image,
          role: profile.role ?? "USER",
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuth = !!auth?.user;
      const isAdmin = auth?.user.role === "ADMIN";
      const isOnAddPost = nextUrl.pathname.startsWith("/add-post");
      const isOnSignin = nextUrl.pathname.startsWith("/signin");
      if (isOnAddPost && !isAdmin) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (isAuth && isOnSignin) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ user, token }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as Role;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
