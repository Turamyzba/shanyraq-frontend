"use client";

import React, {useEffect, useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axiosInstance from "@/axiosInstance/axios";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    if (isError) {
      const timer = setTimeout(() => setIsError(null), 5000); // Clear error after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axiosInstance.post("/auth/forgot-password", {
          email
        });

        localStorage.setItem("email", email);
        router.push("/forgot-password/reset-code");

      }catch (error: any) {
        setIsError(error.response.data);
      } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-full min-w-full space-y-[90px]">
      <div className="hidden sm:block">
        <Header/>
      </div>
      <div className="w-full lg:mx-auto flex justify-center items-center">
        <div className="border-0 lg:border-[#D6D6D6] lg:border lg:rounded-lg lg:p-8 lg:px-[110px] lg:py-[120px]">
          <div className="w-[350px] lg:w-[500px] flex flex-col justify-center items-center relative top-20 lg:relative lg:top-0">
            <h1 className="w-full mb-3 font-circular text-[32px] font-bold leading-[40px] text">
              Забыли пароль?
            </h1>
            <p className="font-circular text-[16px] font-normal leading-[20px]">
              Не волнуйтесь, такое случается со всеми нами. Введите свой адрес
              электронной почты ниже, чтобы восстановить пароль
            </p>
            {isError && (
                <div className="mt-4 text-left w-full text-red-500 text-lg">{isError}</div>
            )}
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
                  disabled={loading}
                type="submit"
                className="mb-3 w-full font-circular font-semibold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                {loading ? "Отправка..." : "Отправить"}
              </button>

              {/* Back Button */}
              <button
                type="button"
                className="w-full font-circular font-semibold text-[20px] py-[10px] rounded-lg"
                onClick={() => router.push("/login")}>
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

export default ForgotPasswordPage;
