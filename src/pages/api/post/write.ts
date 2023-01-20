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

  const { data } = await axios({
    url: `${process.env.BASE_URL}/posts/write`,
    data: newPost,
    method: "post",
  });

  return res.status(200).json(data);
};

export default Handler("POST", WriteHandler);
