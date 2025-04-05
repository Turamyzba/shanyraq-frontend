"use client";

import React, { useEffect, useState } from "react";
import * as Image from "../../public/images";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/axiosInstance/axios";

const RegisterPage = () => {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string[]>([]);

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

    // Reset errors
    setError([]);

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError((prevErrors) => [
        ...prevErrors,
        "Пароли не совпадают. Пожалуйста, убедитесь, что оба пароля одинаковы.",
      ]);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/signup", {
        firstName: firstname,
        lastName: lastname,
        email,
        password, // Send password only if they match
      });

      // Redirect to email verification page
      router.push("/register/verify-email");
      localStorage.setItem("email", email);
    } catch (error: any) {
      console.log(error);
      console.error("Register failed:", error.response?.data);

      // Assuming the backend returns errors as a string or object
      const errorMessage = error.response?.data;

      // Handle if the error message is a single error (not an array of errors)
      if (typeof errorMessage === "string" && errorMessage.includes(";")) {
        const errorList = errorMessage.split(";").map((err) => err.trim());
        console.log(errorList);
        setError(errorList);
      } else if (typeof errorMessage === "string") {
        // If there is only one error, just show it
        setError((prevErrors) => [...prevErrors, errorMessage]);
      } else {
        setError((prevErrors) => [
          ...prevErrors,
          "Неизвестная ошибка, пожалуйста, попробуйте снова.",
        ]);
      }
    }
  };

  const handleGoogle = () => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id:
          "52521307160-9m20iauc3sfq2390f047p2jadddbo1rr.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/google",
      response_type: "code",
      scope: "openid email",
    });

    // Перенаправляем на страницу авторизации Google
    window.location.href = `${googleAuthUrl}?${params.toString()}`;

    // router.push("/login");
  };

  return (
      <div className="min-h-screen min-w-screen space-y-[90px]">
        <div className="hidden sm:block">
          <Header />
        </div>
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
                      className="font-bold text-white bg-[#1132F5] py-2 px-6 rounded-lg hover:bg-[#1132F5df] transition">
                    Выйти
                  </button>
                  <button
                      onClick={() => router.push("/landing")}
                      className="font-bold text-[#1132F5] py-2 px-6 rounded-lg hover:bg-[#f1f1f1] transition">
                    Оставаться
                  </button>
                </div>
              </div>
            </div>
        ) : (
            <div className="w-full mx-auto flex justify-center items-center">
              <div className="border-0  lg:border-[#D6D6D6] lg:border lg:rounded-lg lg:p-8 lg:px-[110px] lg:py-[120px]">
                <div className="w-full flex flex-col items-center px-5">
                  <h1 className="font-circular text-[32px] font-bold leading-[40px] text-center">
                    Присоединяйтесь к Shanyraq!
                  </h1>

                  {error.length > 0 && (
                      <div className="w-full lg:w-[350px] text-red-600 my-[20px] text-left">
                        {error.map((err, index) => (
                            <p key={index}>{err}</p>
                        ))}
                      </div>
                  )}

                  <form onSubmit={handleSubmit} className="w-full mt-[36px]">
                    {/* FirstName Input */}
                    <div className="relative mb-[20px]">
                      <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={firstname}
                          autoComplete="off"
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                          placeholder=""
                          className="peer w-full px-3 py-[8px] text-[20px] font-normal
                text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
                      />
                      <label
                          htmlFor="firstname"
                          className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                              firstname ? "top-[-7px] px-[4px] text-xs" : "text-[20px] "
                          }`}>
                        Имя
                      </label>
                    </div>

                    {/* LastName Input */}
                    <div className="relative mb-[20px]">
                      <input
                          type="text"
                          id="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          required
                          autoComplete="off"
                          placeholder=""
                          className="peer w-full px-3 py-[8px] text-[20px] font-normal
                text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
                      />
                      <label
                          htmlFor="lastname"
                          className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                              lastname ? "top-[-7px] px-[4px] text-xs" : "text-[20px] "
                          }`}>
                        Фамилия
                      </label>
                    </div>

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
                text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
                      />
                      <label
                          htmlFor="email"
                          className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
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
                          className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
                      />
                      <label
                          htmlFor="password"
                          className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
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
                        Потвердите пароль
                      </label>
                      <button
                          className="absolute right-4 bottom-3 cursor-pointer"
                          type="button"
                          disabled={!confirmPassword}
                          onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                          }>
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
                        type="submit"
                        className="w-full font-circular font-bold text-[20px] bg-[#1132F5] text-white py-[10px] rounded-lg hover:bg-[#1132F5df] focus:outline-none transition">
                      Зарегистрироваться
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
                      onClick={handleGoogle}
                      className="w-full flex items-center justify-center text-[20px] gap-2 border py-[10px] rounded-lg hover:bg-gray-100 transition">
                    Войдите с помощью <span className="font-bold">Google</span>
                    <Image.GoogleIcon className="w-[20px] h-[20px]" />
                  </button>

                  <p className="text-center mt-6 text-[20px] text-gray-700">
                    Уже есть учетная запись?{" "}
                    <Link href="/login" className="text-[#1132F5] hover:underline">
                      Войдите
                    </Link>
                  </p>
                </div>
              </div>
            </div>
        )}
        <div className="hidden sm:block">
          <Footer />
        </div>
      </div>
  );
};

export default RegisterPage;
