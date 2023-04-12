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
          const { email, nickname } = matchedUser as UserData;
          return { user: { email, nickname } };
        }

        throw new Error("이메일 주소 또는 비밀번호를 확인해주세요.");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,
});
