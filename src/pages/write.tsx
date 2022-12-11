import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Station {
  station_nm: string;
  station_nm_eng: string;
  visited: boolean;
}

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const [stations, setStations] = useState<Station[]>([]);
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  const watchStation: string = watch("station");

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

  return (
    <div className="flex justify-center h-full">
      <div className="w-2/3">
        <form
          className="flex flex-col items-center w-full h-full border"
          onSubmit={handleSubmit((data) => {
            console.log(data);
            console.log(errors);
          })}
        >
          <input
            type="text"
            placeholder="제목"
            className="w-full p-2 text-2xl focus:outline-sky-300"
            {...register("title", {
              required: "제목을 입력하세요.",
            })}
          />
          <div className="flex w-full px-2 mx-2 my-4">
            <div
              className={`flex w-2/3 flex-col mr-2 ${
                filteredStations.length > 0 &&
                "border-2 border-gray-100 rounded"
              }`}
            >
              <div
                className={`flex justify-between border-gray-100 ${
                  filteredStations.length > 0
                    ? "border-b-2"
                    : "border-2 rounded"
                }`}
              >
                <input
                  type="text"
                  placeholder="지하철역"
                  className="focus:outline-none h-8 w-11/12 px-2"
                  {...register("station", {
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
                  className={`overflow-y-scroll z-10 px-2 hide-scroll ${
                    filteredStations.length > 6 && "h-40"
                  }`}
                >
                  {filteredStations.map((station, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer"
                      onClick={() => {
                        setValue("station", station.station_nm);
                      }}
                    >
                      {station.station_nm}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input type="date" className="bg-gray-500 h-8" />
          </div>

          <input
            type="text"
            placeholder="내용"
            className="w-full p-2 focus:outline-gray-300 z-0"
          />
          <input type="submit" value="Submit" className="cursor-pointer" />
        </form>
      </div>
    </div>
  );
};

// title
// content
// visitedAt
// createdAt
// station

export default Write;
