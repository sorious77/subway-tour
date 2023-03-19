import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";

type UserData = {
  email?: string;
  password?: string;
};

type Error = {
  error: string;
};

const SignupHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Error>
) => {
  const { email, password } = JSON.parse(req.body);

  console.log(email, password);

  try {
    const result = await axios({
      url: `${process.env.BASE_URL}/users/register`,
      data: {
        email,
        password,
      },
      method: "POST",
    });

    console.log(result);

    const success = result.data;

    console.log(result);

    if (success) {
      return res.status(200);
    }

    return res.status(404).json({ error: "회원가입에 실패했습니다." });
  } catch (e) {
    return res.status(404).json({ error: "회원가입에 실패했습니다." });
  }
};

export default Handler("POST", SignupHandler);
