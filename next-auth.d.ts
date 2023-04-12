import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    nickname: string;
    email: string;
  }

  interface Session {
    user: User;
  }
}
