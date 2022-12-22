import { useRecoilValue } from "recoil";
import { userState } from "components/states";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

interface Station {
  name: string;
  code: number;
  lat: number;
  lng: number;
  line: string;
}

const Gacha = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [stations, setStations] = useState<Station[]>();
  const [station, setStation] = useState<Station>();

  useEffect(() => {
    (() => {
      if (!user) {
        router.push("/");
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const stations = await (await fetch("/api/stations/gacha")).json();

      setStations(stations);
    })();
  }, []);

  const handleGacha = () => {
    if (!stations) {
      alert("지하철 역 정보 로딩에 실패했습니다... 잠시 후 다시 실행해주세요");
    }

    let idx = Math.floor(Math.random() * stations!.length);

    console.log(stations![idx]);

    setStation(stations![idx]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Head>
        <title>Subway Tour | 뽑기</title>
      </Head>
      {station && (
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="text-4xl">{station?.name}</div>
          <div className="text-xl text-gray-500">{station?.line}</div>
          <Link
            href={`https://map.naver.com/v5/search/${station.name}역`}
            target="_blank"
            className="flex mt-10"
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
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            <span className="ml-2">지도로 확인하기</span>
          </Link>
        </div>
      )}
      {stations ? (
        <button
          onClick={handleGacha}
          className="px-4 py-2 text-white rounded bg-rose-400 dark:bg-white dark:text-black hover:bg-rose-500 hover:transition-colors hover:duration-500 dark:hover:bg-rose-200"
        >
          뽑아보자구!
        </button>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Gacha;
