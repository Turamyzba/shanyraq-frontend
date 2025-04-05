"use client";

import React, { useEffect, useState } from "react";
import * as Image from "@/public/images";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axiosInstance from "@/axiosInstance/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [IsRemember, setIsRemember] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();


    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint if needed
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Replace your real API call with a local fetch to the mock JSON
            const res = await fetch("/mockLoginData.json");
            const mockData = await res.json();

            // Find user entry with matching credentials
            const user = mockData.find((u: any) => u.email === email && u.password === password);

            if (user) {
                // If found, store the token in localStorage
                localStorage.setItem("token", user.accessToken);
                setIsAuth(true);
                router.push("/");
            } else {
                setErrorMessage("Неправильный логин или пароль");
            }
        } catch (error: any) {
            setErrorMessage("Не удалось авторизоваться!");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-full min-w-full space-y-[90px]">
            <div className="hidden sm:block p-3">
                <Header/>
            </div>

            {isAuth ? (
                <div className="w-[1440px] mx-auto flex justify-center items-center">
                    <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
                        <h1 className="font-circular text-[32px] font-bold leading-[40px] text-center">
                            Вы успешно вошли в аккаунт!
                        </h1>
                        <p className="text-center text-[20px] text-gray-700 mt-4">Хотите выйти?</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsAuth(false);
                                    router.push("/login");
                                }}
                                className="font-bold text-white bg-[#1132F5] py-2 px-6 rounded-lg hover:bg-[#1132F5df] transition">
                                Выйти
                            </button>
                            <button
                                onClick={() => router.push("/landing")}
                                className="font-bold text-[#1132F5] py-2 px-6 rounded-lg hover:bg-[#f1f1f1] transition">
                                Оставаться
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-[100%] lg:mx-auto flex justify-center items-center">
                    <div className="lg:border-[#D6D6D6] lg:border border-0 lg:rounded-lg lg:p-8 lg:px-[110px] lg:py-[120px] px-0 py-0">
                        <div className="w-[350px] h-[546px] lg:w-[450px] flex flex-col justify-center items-center">
                            <h1 className="font-circular text-[24px]/[125%] lg:text-[32px] font-bold leading-[40px] text-center">
                                Войдите в аккаунт Shanyraq!
                            </h1>

                            {errorMessage && (
                                <div className="mt-4 text-left w-full text-red-500 text-lg">{errorMessage}</div>
                            )}

                            <form onSubmit={handleSubmit} className="w-full mt-[36px]">
                                <div className="relative mb-[20px]">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="off"
                                        required
                                        placeholder="Почта"
                                        className="peer w-full px-3 py-[8px] text-[20px] font-normal text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1132F5]"
                                    />
                                </div>

                                <div className="relative mb-[20px]">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1132F5]"
                                    />
                                    <button
                                        className="absolute right-4 bottom-3 cursor-pointer"
                                        type="button"
                                        disabled={!password}
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <Image.eyeOn className="w-[20px] h-[20px]" color="#1132F5" />
                                        ) : (
                                            <Image.eyeOff className="w-[20px] h-[20px]" color="gray" />
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
                                                IsRemember ? "border-[#1132F5]" : "border-gray-300"
                                            }`}>
                                            {IsRemember && <Image.check/>}
                                        </div>
                                        Запомнить меня
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-[16px] text-[#1132F5] hover:underline">
                                        Забыли пароль?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full font-circular font-bold text-[20px] bg-[#1132F5] text-white py-[10px] rounded-lg hover:bg-[#1132F5df] transition">
                                    {isLoading ? "Загрузка..." : "Войти"}
                                </button>
                            </form>

                            <div className="flex items-center my-6 w-full">
                                <hr className="border-gray-300 flex-grow" />
                                <span className="mx-4 text-gray-500 text-sm font-medium">или</span>
                                <hr className="border-gray-300 flex-grow" />
                            </div>

                            <button
                                className="w-full flex items-center justify-center text-[20px] gap-2 border py-[10px] rounded-lg hover:bg-gray-100 transition"
                                onClick={() => console.log("Google Auth")}>
                                Войдите с помощью <span className="font-bold">Google</span>
                                <Image.GoogleIcon className="w-[20px] h-[20px]" />
                            </button>

                            <p className="text-center mt-6 text-[20px] text-gray-700">
                                Нужна учетная запись?{" "}
                                <Link href="/register" className="text-[#1132F5] hover:underline">
                                    Создайте ее
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="hidden sm:block p-3">
                <Footer/>
            </div>
        </div>
    );
};

export default LoginPage;
