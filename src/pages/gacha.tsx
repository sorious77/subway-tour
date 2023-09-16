import { useState } from "react";
import Head from "next/head";
import StationInfo from "components/StationInfo";
import { Station } from "types/stations";
import { useGetStations } from "queries/stations";
import Container from "components/Container";

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
    <Container>
      <Head>
        <title>Subway Tour | 뽑기</title>
      </Head>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <button
          onClick={handleGacha}
          className="w-40 h-12 px-4 py-2 mb-10 text-white rounded bg-rose-400 dark:bg-white dark:text-black hover:bg-rose-500 hover:transition-colors hover:duration-500 dark:hover:bg-rose-200"
        >
          뽑아보자구!
        </button>
      )}

      {station && <StationInfo station={station} />}
      {isError && <div>데이터를 불러오는 중 에러가 발생했습니다</div>}
    </Container>
  );
};

export default Gacha;
