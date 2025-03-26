"use client";
import Image from "next/image";
import * as Images from "../public/images";
import { useRouter } from "next/navigation";

interface CardProps {
  card?: {
    id: number;
    title: string;
    cost: string;
    image: string;
    address: string;
    selectedGender: string;
    roomCount: number;
    roommates: number;
    arriveDate: string;
  };
  isLast?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isLast }) => {
  const router = useRouter();

  return (
    <div className="relative flex-shrink-0 w-[270px] sm:w-[340px] md:w-[375px] scroll-snap-align-start">
      <div
        className="min-h-[460px] sm:min-h-[511px] w-full rounded-[10px] p-4 gap-6 bg-white flex flex-col justify-between items-start"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="relative w-full h-[180px] sm:h-[220px]">
          <Image
            src={card?.image}
            alt={card?.title}
            className="rounded-[10px] object-cover"
            fill
          />
          <div className="absolute top-2 right-2 z-10">
            <Images.share />
          </div>
        </div>

        <div className="flex flex-col gap-[20px] justify-start w-full">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[18px] sm:text-[20px] font-normal text-[#252525] text-left truncate w-[230px] sm:w-[300px]">
              {card?.title}
            </p>

            <span className="flex items-center gap-[6px]">
              <Images.Location w={"18"} h={"18"} color={"#929292"} />
              <p className="text-[14px] sm:text-[16px] font-medium text-[#929292] text-left">
                {card?.address}
              </p>
            </span>
          </div>

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center gap-[6px]">
              <Images.calendarCard h={"24px"} w={"24px"} />
              <p className="text-[12px] sm:text-[14px] font-normal text-[#929292] text-center">
                {card?.arriveDate}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[6px]">
              <Images.apartment h={"24px"} w={"24px"} />
              <p className="text-[12px] sm:text-[14px] text-[#929292] text-center">
                {card?.roomCount} комната
              </p>
            </div>

            <div className="flex flex-col items-center gap-[6px]">
              <Images.genderBoth h={"24px"} w={"24px"} />
              <p className="text-[12px] sm:text-[14px] text-[#929292] text-center">
                {card?.selectedGender}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[6px]">
              <Images.people h={"24px"} w={"24px"} />
              <p className="text-[12px] sm:text-[14px] text-[#929292] text-center">
                {card?.roommates}
              </p>
            </div>
          </div>

          <p className="text-[20px] sm:text-[24px] font-[700] text-[#252525] text-left">
            {card?.cost}
            <span className="underline text-[#252525]">₸</span>
          </p>
        </div>

        <span className="flex items-center">
          <p className="text-[13px] sm:text-[14px] font-[700] text-[#999999] text-left mr-[10px]">
            Узнать больше
          </p>
          <Images.ArrowRight w={"14"} h={"14"} color={"#999999"} />
        </span>
      </div>

      {isLast && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center rounded-[10px] z-50">
          <button
            onClick={() => router.push("/")}
            className="p-[16px] px-[20px] gap-[8px] rounded-[10px] bg-[#1AA683] text-white text-[15px] sm:text-[16px] font-medium"
          >
            Смотреть все квартиры
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
