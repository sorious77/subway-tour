import type { NextApiRequest, NextApiResponse } from "next";
import Handler from "../../libs/Handler";

interface Station {
  station_nm: string;
  station_nm_eng: string;
  visited: boolean;
}

const stations: Station[] = [
  {
    station_nm: "남영",
    station_nm_eng: "Namyeong",
    visited: false,
  },
  {
    station_nm: "용산",
    station_nm_eng: "Yongsan",
    visited: false,
  },
  {
    station_nm: "노량진",
    station_nm_eng: "Noryangjin",
    visited: true,
  },
];

const StationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Station[]>
) => {
  await new Promise((r) => setTimeout(r, 2000));

  const notVisited = stations.filter((station) => !station.visited);

  return res.status(200).json(notVisited);
};

export default Handler("GET", StationHandler);
