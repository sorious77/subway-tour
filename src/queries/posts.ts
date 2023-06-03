import { useQuery } from "react-query";
import { Post } from "types/posts";
import axios from "axios";

const fetchPost = async (id: string): Promise<Post> => {
  const postId = Number(id);

  const { data } = await axios.get(`/api/post/${postId}`);

  return data;
};

export const useGetPost = (id: string) => {
  return useQuery(["post", id], async () => fetchPost(id), {
    onError: () => {
      throw new Error("error!!");
    },
  });
};
