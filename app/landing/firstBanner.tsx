"use client";
import WelcomeImage from "@/public/welcomeLanding.png";
import Search from "../../components/search";

const firstBanner = () => {
  return (
    <div
      className="relative w-full h-[560px] bg-cover bg-center rounded-3xl"
      style={{
        backgroundImage: `url(${WelcomeImage.src})`,
      }}
    >
      <div className="mx-auto relative z-10 pt-14 sm:pt-20 flex flex-col items-center text-white text-center w-full max-w-4xl px-4">
        <h1 className="font-circular text-[34px] sm:text-[40px] md:text-5xl font-bold leading-tight md:leading-[60px] tracking-tight text-center underline-from-font decoration-none">
          Найди идеального сожителя!
        </h1>
        <p className="font-sans mt-4 text-center hidden sm:block sm:text-base md:text-lg font-normal leading-relaxed tracking-normal">
          Маркетплейс для тех, кто ищет комфортное жилье и надежного соседа.
        </p>
        <Search />
      </div>
    </div>
  );
};

export default firstBanner;
