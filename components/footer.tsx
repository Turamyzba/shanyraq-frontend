"use client";
import Link from "next/link";
import * as Images from "../public/images";

const Footer = () => {
  return (
    <footer className="min-w-full flex flex-col justify-between ">
      <div className="w-full px-8 xl:px-36 mx-auto space-y-3 mb-6">
        <hr />
        <section className="flex flex-col gap-5 sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Images.Logo className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]" />
            <h1 className="font-circular font-semibold text-[28px] leading-[38px] text-black">
              Şañyraq
            </h1>
          </div>
          <div className="font-medium text-xs sm:text-[16px] leading-[20px]  text-[#b5b7c0]">
            © 2024{" "}
            <Link href="/landing" className="hover:underline">
              shanyraq.kz
            </Link>
            , все права защищены
          </div>
          <div className="flex space-x-2 order-first sm:order-last">
            <Images.TelegramIcon className="w-[28px] h-[28px]" />
            <Images.InstagramIcon className="w-[28px] h-[28px]" />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
