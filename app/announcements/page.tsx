'use client';

import {useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import MenuItem from "../../components/ui/MenuItem";
import Cards from "@/components/ui/Card";
import Card from "@/components/ui/Card";

export default function AnnouncementsPage() {
    const [activeItem, setActiveItem] = useState("announcements");
    const [activeButton, setActiveButton] = useState<'active' | 'archived'>('active');

    const handleShareClick = () => {
        console.log("Share clicked!");
    };

    const handleChevronClick = () => {
        console.log("Chevron clicked!");
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="w-full max-w-[1440px] mx-auto px-4 flex-grow mt-[50px]">
                <div className="flex w-full gap-10 mt-[35px]">
                    {/* Sidebar */}
                    <div className="flex-none bg-white rounded-[10px] border border-gray-300 w-1/4 min-h-full">
                        <div className="relative flex justify-center mt-[30px]">
                            <div className="w-[130px] h-[130px] rounded-full overflow-hidden relative">
                                <Image src={"/prof.svg"} alt={"Profile Image"} layout="fill" objectFit="cover"/>
                            </div>
                            <button
                                className="absolute bottom-2 right-[10.5rem] bg-[#252525] p-2 rounded-full text-white shadow-lg flex items-center justify-center">
                                <Image src={"/pencil.svg"} alt="Edit" width={14} height={14}/>
                            </button>
                        </div>
                        <div className="text-center mt-5 mb-20">
                            <h2 className="text-base font-medium text-gray-900">Алихан Оспанов</h2>
                        </div>
                        <nav className="space-y-7">
                            <MenuItem
                                label="Профиль"
                                isActive={activeItem === "profile"}
                                href={"/profile"}
                                onClick={() => setActiveItem("profile")}
                            >
                                <Image src={"/user.svg"} alt="Profile Icon" width={20} height={20}/>
                            </MenuItem>
                            <MenuItem
                                label="Мои отклики"
                                isActive={activeItem === "responses"}
                                onClick={() => setActiveItem("responses")}
                            >
                                <Image src={"/reply.svg"} alt="Responses Icon" width={20} height={20}/>
                            </MenuItem>
                            <MenuItem
                                label="Мои объявления"
                                isActive={activeItem === "announcements"}
                                onClick={() => setActiveItem("announcements")}
                            >
                                <Image src={"/announcement.svg"} alt="Announcement Icon" width={20} height={20}/>
                            </MenuItem>
                            <MenuItem
                                label="Анкета"
                                isActive={activeItem === "questionnaire"}
                                onClick={() => setActiveItem("questionnaire")}
                            >
                                <Image src={"/edit.svg"} alt="Questionnaire Icon" width={20} height={20}/>
                            </MenuItem>
                        </nav>
                    </div>


                    {/* Announcements */}
                    <div className="flex-auto bg-white rounded-[10px] border border-gray-300 w-full h-auto p-8">
                        <div className="flex justify-start mb-10">
                            {/* Active Button */}
                            <button
                                className={`${
                                    activeButton === 'active'
                                        ? 'border border-[#252525] hover:border-gray-500 text-[#252525]'
                                        : 'bg-white text-[#b5b7c0] border border-gray-300 border-r-0'
                                } text-sm font-semibold px-[70px] py-3 rounded-l-lg`}
                                onClick={() => setActiveButton('active')}
                            >
                                Активные
                            </button>

                            {/* Archived Button */}
                            <button
                                className={`${
                                    activeButton === 'archived'
                                        ? 'border border-[#252525] hover:border-gray-500 text-[#252525]'
                                        : 'bg-white text-[#b5b7c0]  border border-gray-300 border-l-0'
                                } text-sm font-semibold px-[70px] py-3 rounded-r-lg`}
                                onClick={() => setActiveButton('archived')}
                            >
                                Архивированные
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Card
                                imageUrl="https://via.placeholder.com/400"
                                title="Spacious Room in Central Location"
                                coords="123 Main St, City"
                                date="2023"
                                countOfRooms={3}
                                genderOfRoommate="Any"
                                numberOfRoommates={2}
                                price={1200}
                                onShareClick={handleShareClick}
                                onChevronClick={handleChevronClick}
                            />
                            <Card
                                imageUrl="https://via.placeholder.com/400"
                                title="Spacious Room in Central Location"
                                coords="123 Main St, City"
                                date="2023"
                                countOfRooms={3}
                                genderOfRoommate="Any"
                                numberOfRoommates={2}
                                price={1200}
                                onShareClick={handleShareClick}
                                onChevronClick={handleChevronClick}
                            />
                            <Card
                                imageUrl="https://via.placeholder.com/400"
                                title="Spacious Room in Central Location"
                                coords="123 Main St, City"
                                date="2023"
                                countOfRooms={3}
                                genderOfRoommate="Any"
                                numberOfRoommates={2}
                                price={1200}
                                onShareClick={handleShareClick}
                                onChevronClick={handleChevronClick}
                            />
                            <Card
                                imageUrl="https://via.placeholder.com/400"
                                title="Spacious Room in Central Location"
                                coords="123 Main St, City"
                                date="2023"
                                countOfRooms={3}
                                genderOfRoommate="Any"
                                numberOfRoommates={2}
                                price={1200}
                                onShareClick={handleShareClick}
                                onChevronClick={handleChevronClick}
                            />
                            <Card
                                imageUrl="https://via.placeholder.com/400"
                                title="Spacious Room in Central Location"
                                coords="123 Main St, City"
                                date="2023"
                                countOfRooms={3}
                                genderOfRoommate="Any"
                                numberOfRoommates={2}
                                price={1200}
                                onShareClick={handleShareClick}
                                onChevronClick={handleChevronClick}
                            />
                            <Card
                                imageUrl="https://via.placeholder.com/400"
                                title="Spacious Room in Central Location"
                                coords="123 Main St, City"
                                date="2023"
                                countOfRooms={3}
                                genderOfRoommate="Any"
                                numberOfRoommates={2}
                                price={1200}
                                onShareClick={handleShareClick}
                                onChevronClick={handleChevronClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
}
