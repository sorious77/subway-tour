import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../libs/Handler";

type UserData = {
  email?: string;
  password?: string;
  name?: string;
};

type Error = {
  error: string;
};

const users: UserData[] = [
  {
    email: "test@gmail.com",
    password: "1111",
    name: "test",
  },
];

const LoginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserData | Error>
) => {
  await new Promise((r) => setTimeout(r, 2000));

  const { email, password } = JSON.parse(req.body);

  let matchedUser = null;
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      matchedUser = user;
      return;
    }
  });

  console.log(matchedUser, email, password);

  if (matchedUser) {
    return res.status(200).json(matchedUser);
  }

  return res
    .status(200)
    .json({ error: "일치하는 회원 정보가 존재하지 않습니다." });
};

export default Handler("POST", LoginHandler);
