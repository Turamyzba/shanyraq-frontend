import React from "react";
import Link from "next/link";
import * as Image from "../public/images";

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
  return (
    <Link href={`/announcement/${id}`} passHref key={id}>
      <div className="h-full flex flex-col cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-[200px]">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col p-4 flex-grow bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {card.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{card.address}</p>

          {card.description && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
              {card.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Image.roomCount />
              <span className="text-sm">{card.roomCount} rooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image.maxPeople />
              <span className="text-sm">{card.roommates} roommates</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-[#1132F5] font-bold">${card.cost}</div>
            <div className="text-gray-500 text-sm">
              Available: {new Date(card.arriveDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
