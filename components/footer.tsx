'use client';
import * as Images from "../public/images";

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="w-full max-w-[1440px] mx-auto px-4 py-[38px] flex flex-col items-center space-y-6">
                {/* Divider Line */}
                <div
                    className="w-full h-[1.5px] flex-shrink-0 rounded-[5px] opacity-50 bg-[#D6D6D6]"
                ></div>

                <div className="w-full flex justify-between items-center">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                        <Images.Logo className="w-12 h-12" />
                        <h1 className="text-lg font-semibold text-gray-800">
                            Şañyraq
                        </h1>
                    </div>

                    {/* Copyright Text */}
                    <div className="text-sm text-gray-500">
                        © 2024 shanyraq.kz, все права защищены
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <Images.TelegramIcon className="w-7 h-7 text-gray-500 hover:text-gray-800 cursor-pointer" />
                        <Images.InstagramIcon className="w-7 h-7 text-gray-500 hover:text-gray-800 cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
