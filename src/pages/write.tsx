import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AuthCheck from "libs/AuthCheck";

interface User {
  email: string;
  nickname: string;
}
interface Station {
  name: string;
  code: number;
  lat: number;
  lng: number;
  line: string;
}

interface InputValue {
  title: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
  thumbnail: any;
}

const Write = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
  } = useForm<InputValue>();

  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const watchStation = watch("station_nm");
  const watchThumbnail = watch("thumbnail");

  AuthCheck();

  useEffect(() => {
    (async () => {
      const result = await (await fetch("/api/stations")).json();

      setStations(result);
    })();
  }, []);

  useEffect(() => {
    (() => {
      if (watchStation === "") {
        setFilteredStations([]);
        return;
      }

      const filtered = stations.filter((station) => {
        return station.name.includes(watchStation);
      });

      if (filtered.length === 1 && filtered[0].name === watchStation) {
        setFilteredStations([]);
        return;
      }

      setFilteredStations(filtered);
    })();
  }, [watchStation]);

  useEffect(() => {
    if (watchThumbnail && watchThumbnail.length > 0) {
      const file = watchThumbnail[0];

      setThumbnailUrl(URL.createObjectURL(file));
    }
  }, [watchThumbnail]);

  const writePost = async (data: InputValue) => {
    try {
      const result = await (
        await fetch("/api/post/write", {
          method: "POST",
          body: JSON.stringify({ ...data, author: session?.user.email }),
        })
      ).json();

      return result;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center h-full dark:bg-inherit">
      <div className="w-2/3 pb-4 -mt-6">
        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={handleSubmit(async (data) => {
            const result = await writePost(data);

            router.push(`/post/${result.id}`);
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
                        stations.filter((station) => {
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
            className="z-0 w-full p-2 border-2 border-gray-200 rounded focus:outline-rose-400 bg-inherit"
            rows={15}
            {...register("content")}
          />
          <input
            type="file"
            className="h-16 mt-2 text-center"
            {...register("thumbnail")}
            accept="image/*"
          />
          <img
            src={thumbnailUrl}
            className={`mt-0 mb-10 ${thumbnailUrl ? "h-80" : ""}`}
          />
          <input
            type="submit"
            value="Submit"
            className="px-4 py-2 text-white rounded cursor-pointer bg-rose-400 dark:bg-white dark:text-black"
          />
        </form>
      </div>
    </div>
  );
};

export default Write;
