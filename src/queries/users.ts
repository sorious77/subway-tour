import axios from "axios";
import { useQuery } from "react-query";
import { User } from "types/users";

export const fetchUserByEmail = async (email: string): Promise<User> => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/users/email?email=${email}`
  );

  return data;
};

export const useUserByEmail = (email: string) => {
  return useQuery(["user", email], async () => fetchUserByEmail(email));
};
