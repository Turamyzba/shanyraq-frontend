"use client";

import {useState} from "react";
import * as Image from "../../public/images";
import Header from "@/components/header";
import Footer from "@/components/footer";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [IsRemember, setIsRemember] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="min-h-full min-w-full space-y-[90px]">
            <Header/>
            <div className="w-[1440px] mx-auto flex justify-center items-center">
                <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
                    <div className="w-[450px] flex flex-col items-center">
                        <h1 className="font-circular text-[32px] font-bold leading-[40px] text-center">
                            Войдите в аккаунт Shanyraq!
                        </h1>
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

                            {/* Password Input */}
                            <div className="relative mb-[20px]">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder=""
                                    className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1AA683]"
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1AA683] ${
                                        password ? "top-[-7px] px-[4px] text-xs" : "text-[20px]"
                                    }`}>
                                    Пароль
                                </label>
                                <button
                                    className="absolute right-4 bottom-3 cursor-pointer"
                                    type="button"
                                    disabled={!password}
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <Image.eyeOn
                                            className="w-[20px] h-[20px]"
                                            color={`${password ? "#1AA683" : "gray"}`}
                                        />
                                    ) : (
                                        <Image.eyeOff
                                            className="w-[20px] h-[20px]"
                                            color={`${password ? "#1AA683" : "gray"}`}
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Remember Me and Forgot Password */}
                            <div className="flex items-center justify-between mb-[20px]">
                                <label
                                    htmlFor="remember"
                                    className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={IsRemember}
                                        onChange={() => setIsRemember(!IsRemember)}
                                        className="hidden"
                                    />
                                    <div
                                        className={`w-6 h-6 flex items-center justify-center mr-2 rounded border outline-none ${
                                            IsRemember ? "border-[#1AA683]" : "border-gray-300"
                                        }`}>
                                        {IsRemember && <Image.check/>}
                                    </div>
                                    Запомнить меня
                                </label>
                                <a
                                    href=""
                                    className="text-[16px] text-[#1AA683] hover:underline">
                                    Забыли пароль?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full font-circular font-bold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                                Войти
                            </button>
                        </form>
                        <div className="flex items-center my-6 w-full">
                            <hr className="border-gray-300 flex-grow"/>
                            <span className="mx-4 text-gray-500 text-sm font-medium">
                или
              </span>
                            <hr className="border-gray-300 flex-grow"/>
                        </div>
                        <button
                            className="w-full flex items-center justify-center text-[20px] gap-2 border py-[10px] rounded-lg hover:bg-gray-100 transition">
                            Войдите с помощью <span className="font-bold">Google</span>
                            <Image.GoogleIcon className="w-[20px] h-[20px]"/>
                        </button>

                        <p className="text-center mt-6 text-[20px] text-gray-700">
                            Нужна учетная запись?{" "}
                            <a href="#" className="text-[#1AA683] hover:underline">
                                Создайте ее
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default LoginPage;