import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";

const DeleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  let data = {};

  //   const { data } = await axios({
  //     url: `${process.env.BASE_URL}/posts/${id}`,
  //     data: id,
  //     method: "delete",
  //   });

  return res.status(200).json(data);
};

export default Handler("DELETE", DeleteHandler);
