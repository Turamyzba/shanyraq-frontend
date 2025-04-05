"use client";
import React from "react";
import CtaImage from "@/public/cta.png";
import * as Images from "../../public/images";
import { useModal } from "@/app/context/modal-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SecondBanner = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  const { openModal } = useModal();

  const handleCreateAnn = () => {
    if (isAuth) openModal();
    else router.push("/auth-required");
  };
  return (
    <div className="w-full mt-[60px] sm:mt-[80px] md:mt-[100px] flex items-center justify-center">
      <div
        className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] rounded-[20px] bg-center bg-cover"
        style={{
          backgroundImage: `url(${CtaImage.src})`,
        }}
      >
        <div className="absolute inset-0 rounded-[20px]" /> {/* dark overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-4 sm:px-10 gap-[24px] sm:gap-[32px] max-w-[90%] mx-auto">
          <div className="w-1/2 sm:w-[200px] md:w-[360px] h-[4px] bg-white shadow-[0px_4px_10px_0px_#00000040]"></div>

          <h1 className="font-circular text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-[-0.4px]">
            Начните сдавать комнату сами!
          </h1>
          <p className="text-center text-base sm:text-lg font-normal leading-[24px] max-w-[90%] sm:max-w-[500px]">
            На нашем сайте вы можете выставлять свои объявления
          </p>
          <button
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
            className="flex justify-center items-center gap-[8px] bg-white text-[#252525] font-bold px-[20px] py-[12px] rounded-[8px] hover:bg-gray-100 transition"
            onClick={handleCreateAnn}
          >
            <span className="text-sm sm:text-base">Подать объявление</span>
            <Images.ArrowRight color={"#252525"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
