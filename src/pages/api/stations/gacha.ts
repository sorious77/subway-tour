import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";

interface Station {
  station_nm: string;
  station_nm_eng: string;
  visited: boolean;
}

const GachaHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Station[]>
) => {
  const stations = await axios({
    method: "get",
    url: `${process.env.BASE_URL}/stations/gacha`,
  });

  return res.status(200).json(stations.data);
};

export default Handler("GET", GachaHandler);
