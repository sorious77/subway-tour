import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";

type PostData = {
  title: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
};

const WriteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPost: PostData = JSON.parse(req.body);

  const result = await axios({
    url: `${process.env.BASE_URL}/posts/write`,
    data: newPost,
    method: "post",
  });

  console.log(result.data);

  return res.status(200).json({});
};

export default Handler("POST", WriteHandler);
