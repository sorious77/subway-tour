import Link from "next/link";
import { useState } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { Station } from "types/stations";

interface StationProps {
  station: Station;
}
const StationInfo = ({ station }: StationProps) => {
  const { name, line, lat, lng } = station;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-10 text-center h-2/3">
      <div className="text-4xl">{name}</div>
      <div className="text-xl text-gray-500">{line}</div>
      <Map
        center={{ lat: lat, lng: lng }}
        level={7}
        className="mt-8 w-full border border-gray-100 rounded h-72"
      >
        <ZoomControl position={2} />
        <MapMarker
          position={{ lat: lat, lng: lng }}
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
        >
          {isOpen && (
            <div className="">
              {`🚇 ${name}`}
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
  );
};

export default StationInfo;
