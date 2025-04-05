"use client";

import React, {useEffect, useState} from "react";
import * as Image from "../../../public/images";
import Header from "@/components/header";
import axiosInstance from "@/axiosInstance/axios";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
        setIsErrorPassword(true);
      return;
    }
    const email = localStorage.getItem("email");
    try {
      const response = await axiosInstance.post("/auth/update-password", {
        email,
        password,
      });

      localStorage.removeItem("email");
      router.push("/login");
    } catch (error: any) {
      setIsError(error.response.data);
    } finally {
        setIsLoading(false);
    }
  };
  const handleBackClick = () => {
    const userConfirmed = window.confirm(
      "Вы уверены, что не хотите изменить свой пароль?"
    );
    if (userConfirmed) {
      localStorage.removeItem("email");
      router.push("/login"); // Navigate to login if confirmed
    }
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(null), 5000); // Clear error after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
    if (isErrorPassword) {
      const timer = setTimeout(() => setIsErrorPassword(false), 5000); // Clear error after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isError, isErrorPassword]);

  return (
    <div className="min-h-full min-w-full space-y-[90px]">
      <div className="hidden sm:block">
        <Header/>
      </div>
      <div className="w-full  mx-auto flex justify-center items-center">
        <div className="border-0lg:border-[#D6D6D6] lg:border lg:rounded-lg lg:p-8 lg:px-[110px] lg:py-[120px]">
          <div className="w-[350px] md:w-full flex flex-col items-center md:relative md:top-10 relative top-20 lg:relative lg:top-0">
            <h1 className="w-full text-start mb-3 font-circular text-[24px] lg:text-[32px] font-bold leading-[40px] text">
              Восстановление пароля
            </h1>
            <p className="font-circular text-[16px] font-normal leading-[20px]">
              Пожалуйста, установите новый пароль для своей учетной записи.
            </p>
            {isError && (
                <div className="mt-4 text-center w-full text-red-500 text-lg">
                    {isError}
                </div>
            )}
            {isErrorPassword && (
                <div className="mt-4 text-center w-full text-red-500 text-lg">
                    Пароли не совпадают
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full mt-[36px]">
              {/* Password Input */}
              <div className="relative mb-[20px]">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=""
                  className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                    password ? "top-[-7px] px-[4px] text-xs" : "text-[20px]"
                  }`}>
                  Создайте новый пароль
                </label>
                <button
                  className="absolute right-4 bottom-3 cursor-pointer"
                  type="button"
                  disabled={!password}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Image.eyeOn
                      className="w-[20px] h-[20px]"
                      color={`${password ? "#1132F5" : "gray"}`}
                    />
                  ) : (
                    <Image.eyeOff
                      className="w-[20px] h-[20px]"
                      color={`${password ? "#1132F5" : "gray"}`}
                    />
                  )}
                </button>
              </div>

              {/* ConfirmPassword Input */}
              <div className="relative mb-[20px]">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder=""
                  className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                    confirmPassword
                      ? "top-[-7px] px-[4px] text-xs"
                      : "text-[20px]"
                  }`}>
                  Потвердите новый пароль
                </label>
                <button
                  className="absolute right-4 bottom-3 cursor-pointer"
                  type="button"
                  disabled={!confirmPassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <Image.eyeOn
                      className="w-[20px] h-[20px]"
                      color={`${confirmPassword ? "#1132F5" : "gray"}`}
                    />
                  ) : (
                    <Image.eyeOff
                      className="w-[20px] h-[20px]"
                      color={`${confirmPassword ? "#1132F5" : "gray"}`}
                    />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full font-circular font-bold text-[20px] bg-[#1132F5] text-white py-[10px] rounded-lg hover:bg-[#1132F5df] focus:outline-none transition">
                {isLoading ? "Отправка..." : "Подтвердить"}
              </button>

              {/* Back Button */}
              <button
                type="button"
                className="w-full font-circular font-semibold text-[20px] py-[20px] rounded-lg"
                onClick={handleBackClick}>
                Назад
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Footer/>
      </div>
    </div>
  );
};

export default RegisterPage;
