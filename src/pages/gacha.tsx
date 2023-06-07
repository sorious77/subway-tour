import { useState } from "react";
import Head from "next/head";
import StationInfo from "components/StationInfo";
import { Station } from "types/stations";
import { useGetStations } from "queries/stations";

const Gacha = () => {
  const [station, setStation] = useState<Station>();

  const { isLoading, isError, data: stations } = useGetStations();

  const handleGacha = () => {
    if (!stations) {
      alert("지하철 역 정보 로딩에 실패했습니다... 잠시 후 다시 실행해주세요");
    }

    let idx = Math.floor(Math.random() * stations!.length);

    setStation(stations![idx]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Head>
        <title>Subway Tour | 뽑기</title>
      </Head>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <button
          onClick={handleGacha}
          className="px-4 py-2 text-white rounded bg-rose-400 dark:bg-white dark:text-black hover:bg-rose-500 hover:transition-colors hover:duration-500 dark:hover:bg-rose-200"
        >
          뽑아보자구!
        </button>
      )}

      {station && <StationInfo station={station} />}
      {isError && <div>데이터를 불러오는 중 에러가 발생했습니다</div>}
    </div>
  );
};

export default Gacha;
