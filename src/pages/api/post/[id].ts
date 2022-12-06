import type { NextApiRequest, NextApiResponse } from "next";
import { noWait } from "recoil";
import Handler from "../../../libs/Handler";

interface Post {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: number;
  station_nm?: string;
}

const posts: Post[] = [
  { title: "title1", id: "1", content: "content1" },
  { title: "title2", id: "2", content: "content2" },
  { title: "title3", id: "3", content: "content3" },
  { title: "title4", id: "4", content: "content4" },
  { title: "title5", id: "5", content: "content5" },
  { title: "title6", id: "6", content: "content6" },
  { title: "title7", id: "7", content: "content7" },
  { title: "title8", id: "8", content: "content8" },
  { title: "title9", id: "9", content: "content9" },
  { title: "title10", id: "10", content: "content10" },
  { title: "title11", id: "11", content: "content11" },
  { title: "title12", id: "12", content: "content12" },
  { title: "title13", id: "13", content: "content13" },
  { title: "title14", id: "14", content: "content14" },
  { title: "title15", id: "15", content: "content15" },
  { title: "title16", id: "16", content: "content16" },
  { title: "title17", id: "17", content: "content17" },
  { title: "title18", id: "18", content: "content18" },
  { title: "title19", id: "19", content: "content19" },
  { title: "title20", id: "20", content: "content20" },
  { title: "title21", id: "21", content: "content21" },
  { title: "title22", id: "22", content: "content22" },
  { title: "title23", id: "23", content: "content23" },
  { title: "title24", id: "24", content: "content24" },
  { title: "title25", id: "25", content: "content25" },
  { title: "title26", id: "26", content: "content26" },
  { title: "title27", id: "27", content: "content27" },
  { title: "title28", id: "28", content: "content28" },
  { title: "title29", id: "29", content: "content29" },
  { title: "title30", id: "30", content: "content30" },
  { title: "title31", id: "31", content: "content31" },
  { title: "title32", id: "32", content: "content32" },
  { title: "title33", id: "33", content: "content33" },
  { title: "title34", id: "34", content: "content34" },
  { title: "title35", id: "35", content: "content35" },
  { title: "title36", id: "36", content: "content36" },
  { title: "title37", id: "37", content: "content37" },
  { title: "title38", id: "38", content: "content38" },
  { title: "title39", id: "39", content: "content39" },
  { title: "title40", id: "40", content: "content40" },
  { title: "title41", id: "41", content: "content41" },
  { title: "title42", id: "42", content: "content42" },
  { title: "title43", id: "43", content: "content43" },
  { title: "title44", id: "44", content: "content44" },
  { title: "title45", id: "45", content: "content45" },
  { title: "title46", id: "46", content: "content46" },
  { title: "title47", id: "47", content: "content47" },
  { title: "title48", id: "48", content: "content48" },
  { title: "title49", id: "49", content: "content49" },
  { title: "title50", id: "50", content: "content50" },
  { title: "title51", id: "51", content: "content51" },
];

const ListHandler = async (req: NextApiRequest, res: NextApiResponse<Post>) => {
  await new Promise((r) => setTimeout(r, 2000));

  const {
    query: { id },
  } = req;

  return res.status(200).json({
    ...posts[+id! - 1],
    author: "test",
    createdAt: new Date().getTime(),
    station_nm: "신도림",
  });
};

export default Handler("GET", ListHandler);
