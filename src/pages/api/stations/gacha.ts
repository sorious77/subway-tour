import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../../libs/Handler";
import axios from "axios";

interface Station {
  name: string;
  code: number;
  lat: number;
  lng: number;
  line: string;
}

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
