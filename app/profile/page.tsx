'use client';
import {useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import * as Images from "../../public/images";
import Image from "next/image";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // States for password fields and their visibility
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        // Add your password change logic here
        console.log("Password changed successfully:", {oldPassword, newPassword});
        handleModalClose();
    };

    const [activeItem, setActiveItem] = useState('profile'); // Default active menu item

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header/>

            <div className="w-full max-w-[1440px] mx-auto px-4">

                <div className="w-full my-[35px]">
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <div
                            className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                            <span className="font-bold text-lg">!</span>
                        </div>

                        {/* Text and Progress */}
                        <div className="w-full">
                            {/* Progress Text */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-800">25%</span>
                                <span className="text-sm text-gray-500">Заполните полностью профиль и получите доступ к функции "Поделиться профилем"</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-gray-300 rounded-full">
                                <div
                                    className="h-2 bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                                    style={{width: "55%"}}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Main Content */}
                <div className="mx-auto mb-10">
                    {/* Main Content */}
                    <div className="flex w-full gap-10">
                        {/* Sidebar */}
                        <div className="flex-none bg-white rounded-[10px] border border-gray-300 w-1/3 h-[600px] p-5">
                            {/* Profile Image */}
                            <div className="relative flex justify-center">
                                <div className="w-[130px] h-[130px] rounded-full overflow-hidden relative">
                                    <Image
                                        src={"/prof.svg"}
                                        alt={"Profile Image"}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <button
                                    className="absolute bottom-2 right-[50px] bg-gray-900 p-2 rounded-full text-white shadow-lg flex items-center justify-center">
                                    <Images.Pencil className="w-[20px] h-[20px]"/>
                                </button>
                            </div>

                            {/* Name */}
                            <div className="text-center mt-5 mb-16">
                                <h2 className="text-base font-medium text-gray-900">
                                    Алихан Оспанов
                                </h2>
                            </div>

                            {/* Menu Items */}
                            <nav className="space-y-6">
                                <MenuItem
                                    label="Профиль"
                                    icon={<Images.User className="w-[20px] h-[20px]"/>}
                                    isActive={activeItem === "profile"}
                                    onClick={() => setActiveItem("profile")}
                                />
                                <MenuItem
                                    label="Мои отклики"
                                    icon={<Images.MyResponse className="w-[20px] h-[20px]"/>}
                                    isActive={activeItem === "responses"}
                                    onClick={() => setActiveItem("responses")}
                                />
                                <MenuItem
                                    label="Мои объявления"
                                    icon={<Images.MyAnnouncement className="w-[20px] h-[20px]"/>}
                                    isActive={activeItem === "announcements"}
                                    onClick={() => setActiveItem("announcements")}
                                    isLink
                                    href="../profile/annoucements"
                                />
                                <MenuItem
                                    label="Анкета"
                                    icon={<Images.MyQuestionnaire className="w-[20px] h-[20px]"/>}
                                    isActive={activeItem === "questionnaire"}
                                    onClick={() => setActiveItem("questionnaire")}
                                />
                            </nav>
                        </div>

                        {/* Profile Form */}
                        <div className="flex-auto bg-white rounded-[10px] border border-gray-300 w-full h-[600px] p-8">
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Имя" defaultValue="Алихан" disabled/>
                                <FormInput label="Фамилия" defaultValue="Оспанов" disabled/>
                                <FormInput label="Email" defaultValue="alikhaaan96@gmail.com" type="email" disabled/>
                                <FormInput
                                    label="Номер телефона"
                                    defaultValue="+7 747 447 54 40"
                                    type="text"
                                    disabled
                                />
                                <FormInput label="Дата рождения" type="date"/>
                                <FormSelect
                                    label="Гендер"
                                    options={[
                                        {value: "male", label: "Мужской"},
                                        {value: "female", label: "Женский"},
                                    ]}
                                    defaultValue={selectedOption}
                                    onChange={handleSelectChange}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end mt-6 space-x-4">
                                <button
                                    onClick={handleModalOpen}
                                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Изменить пароль
                                </button>
                                <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                                    Редактировать
                                </button>
                            </div>

                            {/* Modal */}
                            {isModalOpen && (
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                        <h2 className="text-lg font-semibold mb-4">Поменяйте свой пароль</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="space-y-4">
                                                {/* Old Password */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Старый пароль
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showOldPassword ? "text" : "password"}
                                                            value={oldPassword}
                                                            onChange={(e) => setOldPassword(e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowOldPassword((prev) => !prev)}
                                                            className="absolute right-3 top-2.5 text-gray-400"
                                                        >
                                                            {showOldPassword ? "🙈" : "👁"}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* New Password */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Новый пароль
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showNewPassword ? "text" : "password"}
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowNewPassword((prev) => !prev)}
                                                            className="absolute right-3 top-2.5 text-gray-400"
                                                        >
                                                            {showNewPassword ? "🙈" : "👁"}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Confirm Password */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Подтвердите пароль
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                            className="absolute right-3 top-2.5 text-gray-400"
                                                        >
                                                            {showConfirmPassword ? "🙈" : "👁"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Buttons */}
                                            <div className="mt-6 flex justify-between">
                                                <button
                                                    type="submit"
                                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                                                >
                                                    Подтвердить
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleModalClose}
                                                    className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
                                                >
                                                    Отменить
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
}

const MenuItem = ({label, icon, isActive, onClick, isLink = false, href}) => {
    const activeClasses = "text-black font-semibold ml-0";
    const inactiveClasses = "text-gray-500 ml-[24px]";
    const classes = isActive ? activeClasses : inactiveClasses;

    if (isLink) {
        return (
            <Link
                href={href}
                className={`relative flex items-center space-x-8 w-full text-left ${classes}`}
                onClick={onClick}
            >
                {isActive && (
                    <div className="absolute left-0 w-[6px] h-[40px] bg-[#1AA683] rounded-r-lg"></div>
                )}
                <span>{icon}</span>
                <span>{label}</span>
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`relative flex items-center space-x-8 w-full text-left ${classes}`}
        >
            {isActive && (
                <div className="absolute left-0 w-[6px] h-[40px] bg-[#1AA683] rounded-r-lg"></div>
            )}
            <span>{icon}</span>
            <span>{label}</span>
        </button>
    );
};

const FormInput = ({label, type = "text", defaultValue = "", disabled = false,}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                defaultValue={defaultValue} // Use defaultValue for uncontrolled inputs
                disabled={disabled}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
            />
        </div>
    );
};


const FormSelect = ({label, options = [], defaultValue = "", onChange = () => {}}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                defaultValue={defaultValue}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-white"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
