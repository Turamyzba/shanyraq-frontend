"use client";

import React, { useState } from "react";
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
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("The Passwords are not same");
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
      console.error("Verification failed:", error);
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

  return (
    <div className="min-h-full min-w-full space-y-[90px]">
      <Header />
      <div className="w-[1440px] mx-auto flex justify-center items-center">
        <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
          <div className="w-[500px] flex flex-col items-center">
            <h1 className="w-full mb-3 font-circular text-[32px] font-bold leading-[40px] text">
              Восстановление пароля
            </h1>
            <p className="font-circular text-[16px] font-normal leading-[20px]">
              Пожалуйста, установите новый пароль для своей учетной записи.
            </p>
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
                  className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1AA683]"
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1AA683] ${
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

              {/* ConfirmPassword Input */}
              <div className="relative mb-[20px]">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder=""
                  className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1AA683]"
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1AA683] ${
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
                      color={`${confirmPassword ? "#1AA683" : "gray"}`}
                    />
                  ) : (
                    <Image.eyeOff
                      className="w-[20px] h-[20px]"
                      color={`${confirmPassword ? "#1AA683" : "gray"}`}
                    />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full font-circular font-bold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                Продолжить
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
      <Footer />
    </div>
  );
};

export default RegisterPage;
