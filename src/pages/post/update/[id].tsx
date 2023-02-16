import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRecoilValue } from "recoil";
import { userState } from "components/states";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface User {
  nickname: string;
}

interface Station {
  name: string;
  code: number;
  lat: number;
  lng: number;
  line: string;
}

interface PostInfo {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  visitedAt: string;
  station_nm: string;
  user: User;
}

interface InputValue {
  title: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
  thumbnail: any;
}

const Update = ({
  post,
  stations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  const getDate = (timestamp: string) => {
    const date = new Date(timestamp);

    const month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
  } = useForm<InputValue>({
    defaultValues: {
      title: post.title,
      station_nm: post.station_nm,
      visitedAt: getDate(post.visitedAt),
      content: post.content,
    },
  });

  const currentUser = useRecoilValue(userState);

  return (
    <div className="flex flex-col items-center h-full dark:bg-inherit">
      <div className="w-2/3 pb-4 -mt-6">
        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={handleSubmit(async (data) => {
            await fetch(`/api/post/update?id=${post.id}`, {
              method: "PATCH",
              body: JSON.stringify({ ...data }),
            });

            router.push(`/post/${post.id}`);
          })}
        >
          <input
            type="text"
            placeholder="제목"
            className="w-full p-2 text-2xl border-2 border-gray-100 rounded focus:outline-rose-400"
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
          {errors.title && (
            <small
              role="alert"
              className="flex items-center self-start h-6 text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1">{errors.title.message as string}</span>
            </small>
          )}
          <div className="flex items-center justify-between w-full mx-2 my-4">
            <div
              className={`flex w-5/6 flex-col mr-2 border-2 border-gray-100 rounded ${
                filteredStations.length > 0 && "relative"
              }`}
            >
              <div className={`flex justify-between border-gray-100`}>
                <input
                  type="text"
                  placeholder="지하철역"
                  className="w-11/12 h-8 px-2 focus:outline-none"
                  {...register("station_nm", {
                    required: "지하철 역 이름을 입력하세요.",
                    validate: {
                      isExist: (name) =>
                        stations.filter((station: Station) => {
                          return station.name === name;
                        }).length > 0 || "존재하지 않는 역입니다",
                    },
                  })}
                />
                <div
                  className="flex items-center h-8 px-2 cursor-pointer"
                  onClick={() => {
                    reset((data) => ({
                      ...data,
                      station: "",
                    }));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              {filteredStations.length > 0 && (
                <ul
                  className={`overflow-y-scroll px-2 hide-scroll z-10 absolute top-8 bg-gray-50 dark:bg-zinc-800 rounded w-full border-2 border-gray-100 ${
                    filteredStations.length > 6 && "h-40"
                  }`}
                >
                  {filteredStations.map((station, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer"
                      onClick={() => {
                        setFilteredStations([]);
                        setValue("station_nm", station.name, {
                          shouldValidate: true,
                        });
                      }}
                    >
                      {station.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid items-center grid-cols-8">
              <label htmlFor="visitedAt" className="col-span-3 pr-2 text-right">
                방문일자
              </label>
              <input
                type="date"
                className="h-8 col-span-5"
                {...register("visitedAt", {
                  required: "방문일자를 입력하세요",
                })}
                id="visitedAt"
                name="visitedAt"
                max={new Date().toJSON().slice(0, 10).replace(/-/g, "-")}
              />
            </div>
          </div>
          <div className="grid w-full grid-cols-6 mb-4 -mt-4 text-red-400">
            <div className="col-span-5">
              {errors.station_nm && (
                <small className="pl-2">{errors.station_nm.message}</small>
              )}
            </div>
            <div>
              {errors.visitedAt && <small>{errors.visitedAt.message}</small>}
            </div>
          </div>
          <textarea
            placeholder="내용"
            className="z-0 w-full p-2 mb-4 border-2 border-gray-200 rounded focus:outline-rose-400 bg-inherit"
            rows={15}
            {...register("content")}
          />
          <input
            type="submit"
            value="Update"
            className="px-4 py-2 text-white rounded cursor-pointer bg-rose-400 dark:bg-white dark:text-black"
          />
        </form>
      </div>
    </div>
  );
};

export default Update;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query!.id;

  // TODO URL 수정
  const post: PostInfo = await (
    await fetch(`http://localhost:3000/api/post/${id}`)
  ).json();

  const stations: Station[] = await (
    await fetch(`http://localhost:3000/api/stations`)
  ).json();

  return {
    props: { post, stations },
  };
};
