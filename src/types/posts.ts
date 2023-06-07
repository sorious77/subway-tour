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

interface MutatePost {
  id?: string;
  title: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
}

interface List {
  posts: Post[];
  totalPage: number;
  hasMore?: boolean;
}

export type { Post, MutatePost, List };
