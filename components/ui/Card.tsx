import React from 'react';
import Image from 'next/image';

type CardProps = {
    imageUrl: string;
    title: string;
    coords: string;
    date: string;
    countOfRooms: number;
    genderOfRoommate: string;
    numberOfRoommates: number;
    price: number;
    onShareClick: () => void;
    onChevronClick: () => void;
};

const Card: React.FC<CardProps> = ({
                                       imageUrl,
                                       title,
                                       coords,
                                       date,
                                       countOfRooms,
                                       genderOfRoommate,
                                       numberOfRoommates,
                                       price,
                                       onShareClick,
                                       onChevronClick,
                                   }) => {
    return (
        <div className="relative bg-white rounded-lg shadow-md border border-gray-300 max-w-sm p-4">
            {/* Image */}
            <div className="relative mb-4">
                <Image
                    src={'/room.svg'}
                    alt={title}
                    width={400} // Adjust to your image's width
                    height={160} // Adjust to your image's height
                    className="w-full h-40 object-cover rounded-lg"
                />
                {/* Chevron Left */}
                <div className="absolute top-1/2 left-2 opacity-60">
                    <button onClick={onChevronClick} className="p-1.5 bg-gray-200 rounded-[5px]">
                        <Image
                            src={'/chevron-left.svg'}
                            alt="Chevron"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                    </button>
                </div>
                {/* Chevron Right */}
                <div className="absolute top-1/2 right-2 opacity-60">
                    <button onClick={onChevronClick} className="p-1.5 bg-gray-200 rounded-[5px]">
                        <Image
                            src={'/chevron-right.svg'}
                            alt="Chevron"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                    </button>
                </div>
                {/* Edit Button */}
                <div className="absolute top-2 right-2">
                    <button onClick={onShareClick}
                            className="p-1 bg-gradient-to-b from-gray-700 via-gray-500 to-gray-400 rounded-[5px] flex items-center justify-center">
                        <Image
                            src={'/editInImage.svg'}
                            alt="Share"
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            </div>

            {/* Title and Location */}
            <div className="flex flex-col mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-2 gap-2">
                    <Image
                        src={'/location.svg'}
                        alt="Location"
                        width={12}
                        height={12}
                        className="opacity-50"
                    />
                    <span>{coords}</span>
                </div>
            </div>

            {/* Room Details */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex flex-col items-center text-sm text-gray-600">
                    <Image
                        src={'/year.svg'}
                        alt="Year"
                        width={20}
                        height={20}
                        className="opacity-50"
                    />
                    <span>{date}</span>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600">
                    <Image
                        src={'/apartment.svg'}
                        alt="Year"
                        width={20}
                        height={20}
                        className="opacity-50"
                    />
                    <span>{countOfRooms} комната</span>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600">
                    <Image
                        src={'/genderBoth.svg'}
                        alt="Year"
                        width={20}
                        height={20}
                        className="opacity-50"
                    />
                    <span>{genderOfRoommate}</span>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-600">
                    <Image
                        src={'/people.svg'}
                        alt="Year"
                        width={20}
                        height={20}
                        className="opacity-50"
                    />
                    <span>{numberOfRoommates} сожителя</span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center mb-6">
                <span className="text-xl font-bold text-gray-800">{price} <u>₸</u></span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
                <button className="w-full py-3 bg-gray-800 text-white rounded-lg text-sm font-semibold">
                    Архивировать
                </button>
                <button className="w-full py-3 bg-gray-700 text-white rounded-lg text-sm font-semibold">
                    Заявки
                </button>
            </div>
        </div>
    );
};

export default Card;
