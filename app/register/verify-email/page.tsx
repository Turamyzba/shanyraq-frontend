"use client";

import React, { useState, useRef } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axiosInstance from "@/axiosInstance/axios";
import { useRouter } from "next/navigation";

const ResetCodePage = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const inputs = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem("email"); // Get email from localStorage

    if (!email) {
      setError("Email not found.");
      return;
    }

    if (code.some((num) => num === "")) {
      setError("Please fill in all the code fields.");
      return;
    }
    const codeString = code.join("");

    try {
      const response = await axiosInstance.post("/auth/verify-email", {
        email,
        code: codeString,
      });
      router.push("/login");
      localStorage.removeItem("email");
    } catch (error: any) {
      console.error("Verification failed:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const processInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return; // Allow only numbers

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    // Auto-focus to the next input field after a number is typed
    if (slot < code.length - 1 && num) {
      inputs.current[slot + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    slot: number
  ) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (!code[slot] && slot > 0) {
        // Move focus to the previous input field if the current one is empty
        inputs.current[slot - 1]?.focus();
      }
      newCode[slot] = "";
      setCode(newCode);
    }
  };

  return (
    <div className="min-h-full min-w-full space-y-[90px]">
      <Header />
      <div className="w-[1440px] mx-auto flex justify-center items-center">
        <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
          {error && (
            <div className="w-full text-red-600 my-[20px] text-left">
              {error}
            </div>
          )}
          <div className="w-[570px] flex flex-col items-center">
            <h1 className="mb-3 font-circular text-[32px] font-bold leading-[40px] text-center">
              Введите код подтверждения
            </h1>
            <p className="font-circular text-[15px] font-normal leading-[20px] text-[#757575]">
              Пожалуйста, введите 6-значный код, отправленный на ваш электронный
              адрес.
            </p>
            <form onSubmit={handleSubmit} className="w-full ">
              {/* Reset Code Input */}
              <div className="flex justify-between mt-[36px] mb-[20px]">
                {code.map((num, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={num}
                    ref={(el) => (inputs.current[idx] = el!)}
                    onChange={(e) => processInput(e, idx)}
                    onKeyDown={(e) => handleBackspace(e, idx)}
                    className="w-[80px] h-[80px] text-center text-[24px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#1AA683]"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="mb-3 w-full font-circular font-semibold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                Потвердить
              </button>

              {/* Back Button */}
              <button
                type="button"
                className="w-full font-circular font-semibold text-[16px] py-[20px] rounded-lg">
                Отправить код повторно
              </button>

              <button
                type="button"
                className="w-full font-circular font-semibold text-[20px] py-[10px] rounded-lg"
                onClick={() => router.push("/register")}>
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

export default ResetCodePage;
