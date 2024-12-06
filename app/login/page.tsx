"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Assuming response.data contains the token
      const { accessToken } = response.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken); // Store token in sessionStorage
        console.log("Login successful");
        
        // Optionally, update the authentication state (e.g., user info)
        // setUser(response.data.user); // Store user info if needed
        
        // Redirect to the home page or other protected route
        window.location.href = "/landing";
        router.push("/landing"); // Or use a router like `react-router` for navigation
        setIsAuth(true);
      }
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Не удалось авторизоваться!");
    }
  };

  const handleLogout = async () => {
    try {
      // Отправляем запрос на выход из системы (не нужно передавать email и пароль)
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        console.log("Успешный выход из системы");

        // Перенаправляем пользователя на страницу входа
        router.push("/login");
        // Удаляем токен из localStorage
        localStorage.removeItem("token");

        setIsAuth(false);
      } else {
        console.error("Ошибка при выходе из системы");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }

    // Обновляем состояние аутентификации
  };

  return (
    <div className="min-h-full min-w-full space-y-[90px]">
      <Header isFilterResults={false} />
      {isAuth ? (
        // Display logout prompt if the user is authenticated
        <div className="w-[1440px] mx-auto flex justify-center items-center">
          <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
            <h1 className="font-circular text-[32px] font-bold leading-[40px] text-center">
              Вы успешно вошли в аккаунт!
            </h1>
            <p className="text-center text-[20px] text-gray-700 mt-4">
              Хотите выйти?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleLogout}
                className="font-bold text-white bg-[#1AA683] py-2 px-6 rounded-lg hover:bg-[#1aa683df] transition">
                Выйти
              </button>
              <button
                onClick={() => router.push("/landing")}
                className="font-bold text-[#1AA683] py-2 px-6 rounded-lg hover:bg-[#f1f1f1] transition">
                Оставаться
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[1440px] mx-auto flex justify-center items-center">
          <div className="border-[#D6D6D6] border rounded-lg p-8 px-[110px] py-[120px]">
            <div className="w-[450px] flex flex-col items-center">
              <h1 className="font-circular text-[32px] font-bold leading-[40px] text-center">
                Войдите в аккаунт Shanyraq!
              </h1>
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
                    Пароль
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
                        IsRemember ? "border-[#1AA683]" : "border-gray-300"
                      }`}>
                      {IsRemember && <Image.check />}
                    </div>
                    Запомнить меня
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[16px] text-[#1AA683] hover:underline">
                    Забыли пароль?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full font-circular font-bold text-[20px] bg-[#1AA683] text-white py-[10px] rounded-lg hover:bg-[#1aa683df] focus:outline-none transition">
                  Войти
                </button>
              </form>
              <div className="flex items-center my-6 w-full">
                <hr className="border-gray-300 flex-grow" />
                <span className="mx-4 text-gray-500 text-sm font-medium">
                  или
                </span>
                <hr className="border-gray-300 flex-grow" />
              </div>
              <button
                className="w-full flex items-center justify-center text-[20px] gap-2 border py-[10px] rounded-lg hover:bg-gray-100 transition"
                onClick={() => router.push("/login")}>
                Войдите с помощью <span className="font-bold">Google</span>
                <Image.GoogleIcon className="w-[20px] h-[20px]" />
              </button>

              <p className="text-center mt-6 text-[20px] text-gray-700">
                Нужна учетная запись?{" "}
                <Link
                  href="/register"
                  className="text-[#1AA683] hover:underline">
                  Создайте ее
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default LoginPage;
