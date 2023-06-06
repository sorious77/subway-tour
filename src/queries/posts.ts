import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { Post, MutatePost } from "types/posts";
import axios from "axios";

const fetchPost = async (id: string): Promise<Post> => {
  const postId = Number(id);

  const { data } = await axios.get(`/api/post/${postId}`);

  return data;
};

const writePost = async (post: MutatePost): Promise<Post> => {
  const { data } = await axios.post("/api/post/write", post);

  return data;
};

const updatePost = async (post: MutatePost): Promise<Post> => {
  const { data } = await axios.patch(`/api/post/update?id=${post.id}`, post);

  return data;
};

export const useGetPost = (id: string, options?: UseQueryOptions<Post>) => {
  return useQuery(["post", id], async () => fetchPost(id), {
    onError: () => {
      throw new Error("error!!");
    },
    enabled: Boolean(id),
    onSuccess: options && options.onSuccess,
  });
};

export const useWritePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(writePost, {
    onSuccess: () => {
      // queryClient.invalidateQueries("posts")
    },
    onError: () => {
      throw new Error("write post error");
    },
  });
};

export const useUpdatePostMutation = () => {
  return useMutation(updatePost, {
    onSuccess: () => {
      // queryClient.invalidateQueries("posts")
    },
    onError: () => {
      throw new Error("write post error");
    },
  });
};
