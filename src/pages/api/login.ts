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
    .json({ error: "일치하는 회원 정보가 존재하지 않습니다." });
};

export default Handler("POST", LoginHandler);
