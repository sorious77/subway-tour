import { User } from "./users";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  visitedAt: string;
  station_nm: string;
  user: User;
}

export type { Post };
