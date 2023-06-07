import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";
import { MutatePost } from "types/posts";

const WriteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPost: MutatePost = req.body;

  const { data } = await axios({
    url: `${process.env.BASE_URL}/posts/write`,
    data: newPost,
    method: "post",
  });

  return res.status(200).json(data);
};

export default Handler("POST", WriteHandler);
