import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Map,
  MapMarker,
  ZoomControl,
  CustomOverlayMap,
  MapInfoWindow,
} from "react-kakao-maps-sdk";
import AuthCheck from "libs/AuthCheck";

interface Station {
  name: string;
  code: number;
  lat: number;
  lng: number;
  line: string;
}

const Gacha = () => {
  const [stations, setStations] = useState<Station[]>();
  const [station, setStation] = useState<Station>();
  const [isOpen, setIsOpen] = useState(false);

  AuthCheck();

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

    setStation(stations![idx]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Head>
        <title>Subway Tour | 뽑기</title>
      </Head>
      {station && (
        <div className="flex flex-col items-center w-full mb-10 justify-center text-center h-2/3">
          <div className="text-4xl">{station?.name}</div>
          <div className="text-xl text-gray-500">{station?.line}</div>
          <Map
            center={{ lat: station?.lat, lng: station?.lng }}
            level={7}
            className="w-5/6 mt-8 border border-gray-100 rounded h-2/3"
          >
            <ZoomControl position={2} />
            <MapMarker
              position={{ lat: station?.lat, lng: station?.lng }}
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              {isOpen && (
                <div className="">
                  {`🚇 ${station.name}`}
                  <Link href="https://www.naver.com" target={"_blank"}>
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
                        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </MapMarker>
          </Map>
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
