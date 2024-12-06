"use client";
import Image from "next/image";
import * as Images from "../public/images";
import { useEffect, useState } from "react";

interface HomeCardProps {
  card?: {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    city: string;
    gender: string;
    bedrooms: number;
    people: number;
    date: string;
  };
}

const HomeCard: React.FC<HomeCardProps> = ({ card }) => {
  return (
    <div className="relative">
      <div
        className="min-h-[345px] min-w-[267px] rounded-[10px] p-[16px] gap-[26px] bg-white flex flex-col justify-between items-start"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
        <div className="relative">
          <Image
            src={card.photos[0].url}
            alt={card.title}
            className="rounded-[10px] object-cover max-w-[240px] max-h-[130px]"
            width={343}
            height={220}
          />

          <div className="absolute top-2 right-2 z-10">
            <Images.share w={"30"} h={"30"} />
          </div>
        </div>

        <div className="flex flex-col gap-[16px] justify-start w-full">
          <div className="flex flex-col gap-[8px] justify-start">
            <p className="text-[16px] font-semibold text-[#252525] text-left">
              {card.title}
            </p>
            <span className="flex ">
              <Images.Location w={"16"} h={"16"} color={"#929292"} />
              <p className="text-[14px] font-[400] text-[#929292]  text-left">
                {card.region}
              </p>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-[4px]">
              <Images.calendarCard h={"14"} w={"14"} />
              <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card.arriveDate}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[4px]">
              <Images.apartment h={"14"} w={"14"} />
              <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card.quantityOfRooms + " комната"}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[4px]">
              <Images.genderBoth h={"14"} w={"14"} />
              <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card.selectedGender}
              </p>
            </div>

            <div className="flex flex-col items-center gap-[4px]">
              <Images.people h={"14"} w={"14"} />
              <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                {card.numberOfPeopleAreYouAccommodating}
              </p>
            </div>
          </div>

          <p className="text-[16px] font-[700] leading-[20px] text-left text-[#252525]">
            {card.cost}
            <span className="underline decoration-solid text-[#252525]">₸</span>
          </p>

          <span className="flex items-center">
            <p className="text-[12px] font-[500] text-[#999999] leading-[17.5px] text-left mr-[4px]">
              Узнать больше
            </p>
            <Images.ArrowRight w={"14"} h={"14"} color={"#999999"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
