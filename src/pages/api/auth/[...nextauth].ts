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
      credentials: {},
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

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
          return matchedUser as any;
        }

        throw new Error("이메일 주소 또는 비밀번호를 확인해주세요.");
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      const {
        user: { email },
      } = session;

      const { data } = await axios({
        url: `${process.env.BASE_URL}/users/login`,
        data: {
          email,
          password: "1111",
        },
        method: "post",
      });

      session.user = data;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
