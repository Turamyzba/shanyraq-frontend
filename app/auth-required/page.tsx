"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthRequiredPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("landing");
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-lg w-full text-center space-y-8 p-10 rounded-xl">
          <h2 className="text-3xl font-extrabold text-[#1132F5]">
            Доступ ограничен
          </h2>
          <p className="text-lg text-gray-700">
            Только зарегистрированные пользователи могут создавать объявления.
            Пожалуйста, войдите или зарегистрируйтесь.
          </p>
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent text-base font-semibold rounded-md text-white bg-[#1132F5] hover:bg-[#169a76] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1132F5]">
              Войти / Зарегистрироваться
            </Link>
            <Link
              href="/landing"
              className="w-full inline-flex justify-center py-3 px-6 border border-[#1132F5] text-base font-semibold rounded-md text-[#1132F5] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1132F5]">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthRequiredPage;
