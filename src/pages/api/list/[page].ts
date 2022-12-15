import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";

interface Post {
  title: string;
  id: string;
  content: string;
  thumbnail?: string;
}

const ListHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) => {
  const {
    query: { page },
  } = req;

  const { data } = await axios.get(`${process.env.BASE_URL}/posts/${page}`);

  return res.status(200).json(data);
};

export default Handler("GET", ListHandler);
