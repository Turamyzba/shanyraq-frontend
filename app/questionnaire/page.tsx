'use client';

import {useEffect, useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import MenuItem from "../../components/ui/MenuItem";
import Cards from "@/components/ui/Card";
import Card from "@/components/ui/Card";
import SuccessModal from "@/components/ui/SuccesModal";
import Sidebar from "@/components/ui/Sidebar";

export default function AnnouncementsPage() {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMTk2MzAsImV4cCI6MTczMzgyNDQzMH0.rOTk_6xnTxxW7p6MVTijbSGguzfa81bdMq25-1SwSYg`;
    const [activeItem, setActiveItem] = useState("questionnaire");
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        profilePhoto: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/profile', {
                    method: 'GET',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9PV05FUiIsInR5cCI6ImFjY2VzcyIsInN1YiI6Im1pa29vb3NpYTAwNUBnbWFpbC5jb20iLCJpYXQiOjE3MzMyMjI1OTQsImV4cCI6MTczMzgyNzM5NH0.L9qLiI9WbZ858pWECKH8GCX9k8adrczflX-s6L3Ink8`,
                    }
                });
                const data = await response.json();
                setProfileData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    profilePhoto: data.profilePhoto || '/profile.jpg'
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData().then(r => console.log("Profile data fetched successfully!"));
    }, []);

    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
    };

    const handleSubmit = () => {
        setIsModalOpen(false);
    };

    const handlePhotoUpload = (newPhotoUrl: string) => {
        setProfileData((prev) => ({
            ...prev,
            photo: newPhotoUrl,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <div className="w-full max-w-[1440px] mx-auto px-4 flex-grow mt-[50px]">
                {/* Progress Section */}
                <div className="w-full">
                    <div className="flex items-center space-x-4">
                        <div
                            className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                            <span className="font-bold text-lg">!</span>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-800">25%</span>
                                <span className="text-sm text-gray-500">
                                    Заполните полностью профиль и получите доступ к функции "Поделиться профилем"
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                                     style={{width: "55%"}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-10 mt-[35px]">
                    {/* Sidebar */}
                    <Sidebar
                        activeItem={activeItem}
                        setActiveItem={setActiveItem}
                        profileName={`${profileData.firstName} ${profileData.lastName}`}
                        profilePhoto={profileData.profilePhoto} // Pass profile photo URL
                        onPhotoUpload={handlePhotoUpload}
                    />


                    {/* Announcements */}
                    <div className="flex-auto bg-white rounded-[10px] border border-gray-300 w-full h-auto p-8">
                        {/*<div className="flex justify-start mb-10">*/}

                        {/*</div>*/}

                        {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">*/}

                        {/*</div>*/}
                        <div className="p-2 w-full">
                            {/* Question 1 */}
                            <div className="mb-6">
                                <p className="font-semibold mb-2">Вопрос 1 : Какой ваш обычный распорядок дня и каковы
                                    ваши жизненные приоритеты?</p>
                                <div>
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="question1" className="mr-2"/>
                                        Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную
                                        обстановку дома.
                                    </label>
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="question1" className="mr-2"/>
                                        Я бываю дома только по вечерам, так как учусь/работаю весь день.
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="question1" className="mr-2"/>
                                        Мне без разницы.
                                    </label>
                                </div>
                            </div>

                            {/* Question 2 */}
                            <div className="mb-6">
                                <p className="font-semibold mb-2">Вопрос 2 : Как вы относитесь к религии?</p>
                                <div>
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="question2" className="mr-2"/>
                                        Я соблюдаю религиозные практики.
                                    </label>
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="question2" className="mr-2"/>
                                        Я не практикую религию.
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="question2" className="mr-2"/>
                                        Мне без разницы.
                                    </label>
                                </div>
                            </div>

                            {/* Question 3 */}
                            <div className="mb-6">
                                <p className="font-semibold mb-2">Вопрос 3 : Какое у вас отношение к курению?</p>
                                <div>
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="question3" className="mr-2"/>
                                        Я спокойно отношусь к курению.
                                    </label>
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="question3" className="mr-2"/>
                                        Я не курю и предпочитаю, чтобы со мной жил человек с такими же взглядами.
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="question3" className="mr-2"/>
                                        Мне без разницы.
                                    </label>
                                </div>
                            </div>

                            {/* Modal */}
                            {isModalOpen && (
                                <div
                                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                                        <div className="text-center">
                                            <p className="text-xl font-semibold text-gray-800 mb-4">Вы еще не прошли
                                                анкету</p>
                                            <p className="text-gray-600 mb-6">
                                                Чтобы получить доступ вы должны пройти анкету
                                            </p>
                                            <button
                                                onClick={handleSubmit}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            >
                                                Пройти анкету
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex items-center gap-5">
                            <button
                                type="button"
                                className="text-[#252525] p-[15px] rounded-[5px] hover:bg-gray-100"
                            >
                                Отменить
                            </button>
                            <button type="submit"
                                    onClick={openSuccessModal}
                                    className="bg-[#32343a] text-white p-[15px] rounded-[5px]">
                                Сохранить и выйти
                            </button>
                        </div>

                        {/* Render the modal if it's open */}
                        {isSuccessModalOpen && <SuccessModal onClose={() => setIsSuccessModalOpen(false)}/>}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
}
