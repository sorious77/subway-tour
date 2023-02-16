import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";

interface Post {
  title: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  id: string;
}

const UpdateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const post: Post = JSON.parse(req.body);

  const { data } = await axios({
    url: `${process.env.BASE_URL}/posts/${id}`,
    data: { ...post },
    method: "patch",
  });

  return res.status(200).json(data);
};

export default Handler("PATCH", UpdateHandler);
