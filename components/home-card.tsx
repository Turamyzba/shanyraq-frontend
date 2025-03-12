"use client";
import Image from "next/image";
import * as Images from "../public/images";
import {useState} from "react";
import Link from "next/link";

interface HomeCardProps {
    card?: {
        announcementId: number;
        title: string;
        cost: string;
        image: string;
        address: string;
        roomCount: number;
        roommates: number;
        arriveDate: string;
        selectedGender: string;
    },
    key?: unknown
}

const HomeCard: React.FC<HomeCardProps> = ({card, key}) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const toggleShareModal = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent navigation when clicking on the share button
        setIsShareModalOpen(!isShareModalOpen);
    };

    const copyToClipboard = () => {
        const shareUrl = `${window.location.origin}/announcement/${card?.announcementId}`;
        navigator.clipboard.writeText(shareUrl).then(
            () => alert("Link copied to clipboard!"),
            () => alert("Failed to copy the link.")
        );
    };

    return (
        <div className="relative">
            <div
                className="min-h-[345px] min-w-[267px] rounded-[10px] p-[16px] gap-[26px] bg-white flex flex-col justify-between items-start"
                style={{boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)"}}>
                <div className="relative">
                    <Link href={`/announcement/${card?.announcementId}`}>
                        <Image
                            src={card.image}
                            alt={card.image}
                            className="rounded-[10px] object-cover max-w-[240px] max-h-[130px]"
                            width={343}
                            height={220}
                        />
                    </Link>

                    <div className="absolute top-2 right-2 z-10">
                        <button onClick={toggleShareModal}>
                            <Images.share w={"50"} h={"50"}/>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-[16px] justify-start w-full">
                    <Link href={`/announcement/${card?.announcementId}`}>
                        <div className="flex flex-col gap-[8px] justify-start">
                            <p className="text-[16px] font-semibold text-[#252525] text-left">
                                {card?.title?.length > 22
                                    ? card?.title?.substring(0, 22) + "..."
                                    : card?.title}
                            </p>
                            <span className="flex">
                <Images.Location w={"16"} h={"16"} color={"#929292"}/>
                <p className="text-[14px] font-[400] text-[#929292] text-left">
                  {card?.address?.length > 27
                      ? card?.address?.substring(0, 27) + "..."
                      : card?.address}
                </p>
              </span>
                        </div>
                    </Link>

                    <Link href={`/announcement/${card?.announcementId}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col items-center gap-[4px]">
                                <Images.calendarCard h={"14"} w={"14"}/>
                                <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                                    {card.arriveDate}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-[4px]">
                                <Images.apartment h={"14"} w={"14"}/>
                                <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                                    {card.roomCount + " комната"}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-[4px]">
                                <Images.genderBoth h={"14"} w={"14"}/>
                                <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                                    {card.selectedGender}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-[4px]">
                                <Images.people h={"14"} w={"14"}/>
                                <p className="text-[12px] font-normal text-[#929292] leading-[17.5px] text-center">
                                    {card.roommates}
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link href={`/announcement/${card?.announcementId}`}>
                        <p className="text-[16px] font-[700] leading-[20px] text-left text-[#252525] cursor-pointer">
                            {card.cost}
                            <span className="underline decoration-solid text-[#252525]">
                ₸
              </span>
                        </p>
                    </Link>

                    <span className="flex items-center">
            <Link href={`/announcement/${card?.announcementId}`}>
              <p className="text-[12px] font-[500] text-[#999999] leading-[17.5px] text-left mr-[4px] cursor-pointer">
                Узнать больше
              </p>
            </Link>
            <Images.ArrowRight w={"14"} h={"14"} color={"#999999"}/>
          </span>
                </div>
            </div>

            {isShareModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold text-[#252525] mb-4">
                            Поделиться объявлением
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Скопируйте ссылку и поделитесь с друзьями:
                        </p>
                        <div className="flex items-center justify-between border p-2 rounded-md mb-4">
                            <p className="text-sm text-gray-800 truncate">
                                {`${window.location.origin}/announcement/${card?.announcementId}`}
                            </p>
                            <button
                                onClick={copyToClipboard}
                                className="bg-[#1AA683] text-white px-4 py-1 rounded-md hover:bg-[#158f72]">
                                Копировать
                            </button>
                        </div>
                        <button
                            onClick={toggleShareModal}
                            className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 w-full">
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeCard;
