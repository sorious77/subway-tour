import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userState } from "components/states";

interface User {
  email: string;
  password: string;
  name: string;
}
interface Station {
  station_nm: string;
  station_nm_eng: string;
  visited: boolean;
}

type InputValue = {
  title: string;
  station_nm: string;
  visitedAt: string;
  content: string;
  author: string;
};

const Write = () => {
  const user: User | null = useRecoilValue(userState);

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

  const watchStation = watch("station_nm");

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
        return (
          station.station_nm.includes(watchStation) ||
          station.station_nm_eng
            .toLowerCase()
            .includes(watchStation.toLowerCase())
        );
      });

      if (filtered.length === 1 && filtered[0].station_nm === watchStation) {
        setFilteredStations([]);
        return;
      }

      setFilteredStations(filtered);
    })();
  }, [watchStation]);

  const writePost = async (data: InputValue) => {
    try {
      const result = await (
        await fetch("/api/post/write", {
          method: "POST",
          body: JSON.stringify({ ...data, author: user!.name }),
        })
      ).json();

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center h-full py-10 bg-gray-50 dark:bg-inherit">
      <div className="w-2/3 p-2">
        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={handleSubmit(async (data) => {
            writePost(data);
          })}
        >
          <input
            type="text"
            placeholder="제목"
            className="w-full p-2 text-2xl focus:outline-none"
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
          {errors.title && (
            <small
              role="alert"
              className="flex items-center h-6 mb-4 -mt-2 text-red-400 self-start"
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
          <div className="flex w-full mx-2 my-4 items-center justify-between">
            <div
              className={`flex w-5/6 flex-col mr-2 border-2 border-gray-100 rounded ${
                filteredStations.length > 0 && "relative"
              }`}
            >
              <div className={`flex justify-between border-gray-100`}>
                <input
                  type="text"
                  placeholder="지하철역"
                  className="focus:outline-none h-8 w-11/12 px-2"
                  {...register("station_nm", {
                    required: "지하철 역 이름을 입력하세요.",
                  })}
                />
                <div
                  className="px-2 cursor-pointer h-8 flex items-center"
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
                        setValue("station_nm", station.station_nm);
                      }}
                    >
                      {station.station_nm}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input type="date" className="h-8" {...register("visitedAt")} />
          </div>

          <textarea
            placeholder="내용"
            className="w-full p-2 focus:outline-sky-300 z-0 h-full bg-inherit border-2 border-gray-200 rounded"
            {...register("content")}
          />
          <input
            type="submit"
            value="Submit"
            className="cursor-pointer bg-black dark:bg-white text-white dark:text-black rounded py-2 px-4 mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default Write;
