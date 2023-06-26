import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";

const DeleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const { data } = await axios({
    url: `${process.env.BASE_URL}/posts/${id}`,
    data: id,
    method: "delete",
  });

  if (data.deletedCount == 1) {
    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ success: false });
};

export default Handler("DELETE", DeleteHandler);
