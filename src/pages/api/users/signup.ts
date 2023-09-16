import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";

type Error = {
  error: boolean;
  message: string;
};

const SignupHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Error | null>
) => {
  const { email, password } = JSON.parse(req.body);

  try {
    const {
      data: { error, message },
    } = await axios({
      url: `${process.env.BASE_URL}/users/register`,
      data: {
        email,
        password,
      },
      method: "POST",
    });

    return res.status(200).json({ error, message });
  } catch (e) {
    console.log("error : ", e);
    return res
      .status(404)
      .json({ error: true, message: "회원 가입에 실패했습니다." });
  }
};

export default Handler("POST", SignupHandler);
