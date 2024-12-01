'use client';

import {useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-full min-w-full space-y-[90px]">
            <Header/>
            <div className="w-[1440px] mx-auto flex justify-center items-center">
                <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
                    <div className="w-[500px] flex flex-col items-center">
                        <h1 className="w-full mb-3 font-circular text-[32px] font-bold leading-[40px] text">
                            Забыли пароль?
                        </h1>
                        <p className="font-circular text-[16px] font-normal leading-[20px]">
                            Не волнуйтесь, такое случается со всеми нами. Введите свой адрес
                            электронной почты ниже, чтобы восстановить пароль
                        </p>
                        <form onSubmit={handleSubmit} className="w-full mt-[36px]">
                            {/* Email Input */}
                            <div className="relative mb-[20px]">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                    required
                                    placeholder=""
                                    className="peer w-full px-3 py-[8px] text-[20px] font-normal
               text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1AA683]"
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1AA683] ${
                                        email ? "top-[-7px] px-[4px] text-xs" : "text-[20px] "
                                    }`}>
                                    Почта
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mb-3 w-full font-circular font-semibold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                                Продолжить
                            </button>

                            {/* Back Button */}
                            <button
                                type="button"
                                className="w-full font-circular font-semibold text-[20px] py-[10px] rounded-lg">
                                Назад
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ForgotPasswordPage;
