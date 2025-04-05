// components/home-card.tsx (исправленная версия)
"use client";
import Image from "next/image";
import * as Images from "../public/images";
import { useState } from "react";
import Link from "next/link";

interface HomeCardProps {
  card: {
    announcementId: number;
    title: string;
    cost: string;
    image: string;
    address: string;
    roomCount: number;
    roommates: number;
    arriveDate: string;
    selectedGender: string;
    description?: string;
  };
  id: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ card, id }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const toggleShareModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsShareModalOpen(!isShareModalOpen);
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}/announcement/${id}`;
    navigator.clipboard.writeText(shareUrl).then(
      () => alert("Link copied to clipboard!"),
      () => alert("Failed to copy the link.")
    );
  };

  return (
    <div className="relative h-full">
      <div
        className="h-full min-h-[438px] xl:min-h-[345px] w-full rounded-[10px] p-[16px] gap-[16px] bg-white flex flex-col justify-between items-start transition-shadow duration-300 hover:shadow-lg"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="relative w-full h-[220px]">
          <Link href={`/announcement/${id}`}>
            <div className="w-full h-full rounded-[10px] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover w-full h-full rounded-[10px] transition-transform duration-500 hover:scale-105"
                width={343}
                height={220}
                unoptimized={true}
              />
            </div>
          </Link>

          <button
            onClick={toggleShareModal}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Images.share w={"20"} h={"20"} />
          </button>
        </div>

        <div className="flex flex-col gap-[16px] justify-start w-full flex-grow mt-3">
          <Link href={`/announcement/${id}`} className="group">
            <div className="flex flex-col gap-[8px] justify-start">
              <p className="text-[16px] font-semibold text-[#252525] text-left line-clamp-1 group-hover:text-[#1132F5] transition-colors">
                {card.title}
              </p>
              <div className="flex items-center">
                <Images.Location w={"16"} h={"16"} color={"#929292"} />
                <p className="ml-1 text-[14px] font-[400] text-[#929292] text-left line-clamp-1">
                  {card.address}
                </p>
              </div>
            </div>
          </Link>

          {card.description && (
            <Link href={`/announcement/${id}`}>
              <p className="text-[14px] text-gray-700 line-clamp-2">
                {card.description}
              </p>
            </Link>
          )}

          <Link href={`/announcement/${id}`}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-[4px]">
                <Images.calendarCard h={"14"} w={"14"} />
                <p className="text-[12px] font-normal text-[#929292] text-center">
                  {new Date(card.arriveDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col items-center gap-[4px]">
                <Images.apartment h={"14"} w={"14"} />
                <p className="text-[12px] font-normal text-[#929292] text-center">
                  {card.roomCount} room{card.roomCount !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex flex-col items-center gap-[4px]">
                <Images.genderBoth h={"14"} w={"14"} />
                <p className="text-[12px] font-normal text-[#929292] text-center">
                  {card.selectedGender}
                </p>
              </div>

              <div className="flex flex-col items-center gap-[4px]">
                <Images.people h={"14"} w={"14"} />
                <p className="text-[12px] font-normal text-[#929292] text-center">
                  {card.roommates}
                </p>
              </div>
            </div>
          </Link>

          <div className="mt-auto flex justify-between items-center">
            <Link href={`/announcement/${id}`}>
              <p className="text-[16px] font-[700] text-[#1132F5]">
                ${card.cost}
              </p>
            </Link>

            <Link
              href={`/announcement/${id}`}
              className="flex items-center group"
            >
              <p className="text-[12px] font-[500] text-[#999999] mr-[4px] group-hover:text-[#1132F5] transition-colors">
                Learn more
              </p>
              <Images.ArrowRight w={"14"} h={"14"} color={"#999999"} />
            </Link>
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[#252525] mb-4">
              Share this listing
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Copy the link and share with friends:
            </p>
            <div className="flex items-center justify-between border p-2 rounded-md mb-4">
              <p className="text-sm text-gray-800 truncate">
                {`${window.location.origin}/announcement/${id}`}
              </p>
              <button
                onClick={copyToClipboard}
                className="bg-[#1132F5] text-white px-4 py-1 rounded-md hover:bg-[#0e2ac9] transition-colors"
              >
                Copy
              </button>
            </div>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 w-full transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
