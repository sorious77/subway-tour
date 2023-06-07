import { useQuery } from "react-query";
import { Station } from "types/stations";
import axios from "axios";

const fetchStations = async (): Promise<Station[]> => {
  const { data } = await axios.get("/api/stations/gacha");

  return data;
};

export const useGetStations = () => {
  return useQuery(["stations"], async () => fetchStations());
};
