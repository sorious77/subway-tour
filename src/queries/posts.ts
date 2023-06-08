import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "react-query";
import { Post, MutatePost, List } from "types/posts";
import axios from "axios";

const queryClient = new QueryClient();

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

export const fetchPostList = async (page: number): Promise<List> => {
  const { data } = await axios.get(`/api/list/${page}`);

  return data;
};

const deletePost = async (id: string): Promise<Boolean> => {
  const { data } = await axios.delete(`/api/post/delete?id=${id}`);

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
  return useMutation(writePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("postList");
    },
    onError: () => {
      throw new Error("write post error");
    },
  });
};

export const useUpdatePostMutation = () => {
  return useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("postList");
    },
    onError: () => {
      throw new Error("write post error");
    },
  });
};

export const usePostList = (page: number) => {
  return useQuery(["postList", page], () => fetchPostList(page), {
    staleTime: 5000,
    keepPreviousData: true,
    select: (data) => {
      return { ...data, hasMore: data.totalPage > page };
    },
  });
};

export const usePrefetchPostList = (page: number) => {
  return queryClient.prefetchQuery(["postList", page + 1], () =>
    fetchPostList(page + 1)
  );
};

export const useDeletePostMutation = () => {
  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("postList");
    },
    onError: () => {
      throw new Error("delete post error");
    },
  });
};
