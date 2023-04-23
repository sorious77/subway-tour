import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserData {
  email: string;
  password?: string;
  nickname: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _) {
        const { email, password } = credentials!;

        const result = await axios({
          url: `${process.env.BASE_URL}/users/login`,
          data: {
            email,
            password,
          },
          method: "post",
        });

        const matchedUser = result.data;

        if (matchedUser && matchedUser.email) {
          const { email, nickname } = matchedUser as UserData;

          return { user: { email, nickname } } as any;
        }

        throw new Error("이메일 주소 또는 비밀번호를 확인해주세요.");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token?.user as any;
      }

      return session;
    },
  },
});
