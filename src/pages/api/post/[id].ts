import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { noWait } from "recoil";
import Handler from "../../../libs/Handler";

interface Post {
  title: string;
  createdAt: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
  _id: string;
  id: string;
}

const ListHandler = async (req: NextApiRequest, res: NextApiResponse<Post>) => {
  const {
    query: { id },
  } = req;

  const { data } = await axios({
    url: `${process.env.BASE_URL}/posts/${id}`,
    data: id,
    method: "get",
  });

  return res.status(200).json(data);
};

export default Handler("GET", ListHandler);
