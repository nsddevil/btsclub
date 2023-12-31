import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      /** The user's postal address. */
    } & DefaultSession["user"];
  }
}
