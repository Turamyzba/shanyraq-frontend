'use client';
import {useState} from "react";
import * as Images from "../public/images";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("Kazakh");

    const languages = [
        {id: 1, name: "Kazakh", icon: <Images.FlagKaz/>},
        {id: 2, name: "Russian", icon: <Images.FlagRu/>},
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="bg-white">
            <div className="w-full max-w-[1440px] mx-auto mt-6 space-y-6 px-4">
                {/* Top Navigation */}
                <section className="flex justify-between items-center">
                    {/* Left Links */}
                    <div className="flex items-center space-x-4 text-sm text-gray-700">
                        <Images.Location className="w-4 h-4"/>
                        <a href="#" className="underline underline-offset-2 pr-2">
                            Астана
                        </a>
                        <a href="#" className="underline underline-offset-2">
                            Объявления
                        </a>
                    </div>

                    {/* Right Language Selector */}
                    <div className="relative flex items-center space-x-5">
                        <Images.Light className="w-6 h-6 text-gray-600"/>
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                            {languages.find((lang) => lang.name === selectedLanguage)?.icon}
                            <Images.Vector className="w-4 h-4"/>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 top-8 w-[120px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <ul className="py-2">
                                    {languages.map((language) => (
                                        <li
                                            key={language.id}
                                            onClick={() => {
                                                setSelectedLanguage(language.name);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded ${
                                                selectedLanguage === language.name
                                                    ? "bg-[#1aa68383] text-white"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {language.icon}
                                            <span>{language.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* Logo and Main Action */}
                <section className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Images.Logo className="w-[50px] h-[50px]"/>
                        <h1 className="text-2xl font-semibold text-gray-800">Şañyraq</h1>
                    </div>

                    {/* Call-to-Action Button */}
                    <button
                        className="flex items-center justify-center space-x-2 bg-[#1aa683] text-white font-bold px-6 py-3 rounded hover:bg-[#159f72]">
                        <span>Подать объявление</span>
                        <Images.ArrowRight className="w-5 h-5"/>
                    </button>
                </section>

                {/* Divider Line */}
                <span className="block w-full h-[1.5px] bg-[#D6D6D6] rounded opacity-50 mt-4"></span>
            </div>
        </header>
    );
};

export default Header;
