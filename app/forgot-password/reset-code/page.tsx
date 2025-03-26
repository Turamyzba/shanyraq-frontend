"use client";

import React, {useState, useRef, useEffect} from "react";
import Header from "@/components/header";
import axiosInstance from "@/axiosInstance/axios";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

const ResetCodePage = () => {
  const [code, setCode] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  const [delay, setDelay] = useState(0); // Delay time in seconds




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const email = localStorage.getItem("email");
    const codeString = code.join("");
    try {
      const response = await axiosInstance.post("/auth/verify-code", {
        email,
        code: codeString,
      });

      router.push("/forgot-password/confirm-password");
    } catch (error: any) {
      setIsError(error.response.data);
      console.log(error.response.data)
    } finally {
        setIsLoading(false);
    }
  };

  const resend = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Email not found");
      return;
    }

    try {
      await axiosInstance.post("/auth/resendCode", { email });
      setIsSuccess(true);

      // Start the countdown
      setDelay(60); // Set delay time in seconds
    } catch (error: any) {
      setIsError(error.response.data);
    }
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(null), 5000); // Clear error after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }

    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(null), 5000); // Clear success message after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [isError, isSuccess]);

  // Countdown effect
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setDelay((prev) => prev - 1), 1000);
      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [delay]);

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
      <div className="hidden sm:block">
        <Header/>
      </div>
      <div className="w-[350px] md:w-full mx-auto flex justify-center items-center">
        <div className="border-0 lg:border-[#D6D6D6] lg:border lg:rounded-lg lg:p-8 lg:px-[110px] lg:py-[120px] md:relative md:top-0 relative top-20 lg:relative lg:top-0">
          <div className="w-[350px] md:w-full flex flex-col items-center justify-center">
            <h1 className="mb-3 font-circular text-[24px] lg:text-[32px] font-bold leading-[40px] text-center">
              Введите код подтверждения
            </h1>
            <p className="font-circular text-[15px] font-normal leading-[20px] text-[#757575]">
              Пожалуйста, введите 6-значный код, отправленный на ваш электронный
              адрес.
            </p>
            {isError && (
                <div className="mt-4 text-center w-full text-red-500 text-lg">{isError}</div>
            )}
            {isSuccess && (
                <div className="mt-4 text-center w-full text-green-500 text-lg">Код отправлен повторно</div>
            )}
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
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] text-center text-[24px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#1AA683]"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="mb-3 w-full font-circular font-semibold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                {isLoading ? "Отправка..." : "Подтвердить"}
              </button>

              {/* Back Button */}
              <button
                  type="button"
                  className="w-full font-circular font-semibold text-[16px] py-[20px] rounded-lg border-black border-1"
                  onClick={resend}
                  disabled={delay > 0} // Disable button during countdown
              >
                {delay > 0 ? `Повторить можно через ${delay} сек.` : "Отправить код повторно"}
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

export default ResetCodePage;
