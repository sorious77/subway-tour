import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";
import { Station } from "types/stations";

const GachaHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Station[]>
) => {
  const stations = await axios({
    method: "get",
    url: `${process.env.BASE_URL}/stations/`,
  });

  return res.status(200).json(stations.data);
};

export default Handler("GET", GachaHandler);
