import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../libs/Handler";
import axios from "axios";

type UserData = {
  email?: string;
  password?: string;
  name?: string;
};

type Error = {
  error: string;
};

const LoginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserData | Error>
) => {
  const { email, password } = JSON.parse(req.body);

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
    return res.status(200).json(matchedUser);
  }

  return res
    .status(200)
    .json({ error: "이메일 주소 또는 비밀번호를 확인해주세요." });
};

export default Handler("POST", LoginHandler);
