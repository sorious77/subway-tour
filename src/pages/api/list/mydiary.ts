import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";
import { Post } from "types/posts";

const MyDiaryHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) => {
  const {
    query: { page, email },
  } = req;

  const { data } = await axios.get(
    `${process.env.BASE_URL}/lists/myDiary?page=${page}&email=${email}`
  );

  return res.status(200).json(data);
};

export default Handler("GET", MyDiaryHandler);
