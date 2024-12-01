'use client';

import {useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import MenuItem from "../../components/ui/MenuItem";
import Cards from "@/components/ui/Card";
import Card from "@/components/ui/Card";
import SuccessModal from "@/components/ui/SuccesModal";

export default function AnnouncementsPage() {
    const [activeItem, setActiveItem] = useState("questionnaire");
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
    };

    const handleSubmit = () => {
        setIsModalOpen(false);
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
                                href={"/announcements"}
                                onClick={() => setActiveItem("announcements")}
                            >
                                <Image src={"/announcement.svg"} alt="Announcement Icon" width={20} height={20}/>
                            </MenuItem>
                            <MenuItem
                                label="Анкета"
                                href={"/questionnaire"}
                                isActive={activeItem === "questionnaire"}
                                onClick={() => setActiveItem("questionnaire")}
                            >
                                <Image src={"/edit.svg"} alt="Questionnaire Icon" width={20} height={20}/>
                            </MenuItem>
                        </nav>
                    </div>


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
