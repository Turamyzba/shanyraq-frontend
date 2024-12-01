"use client";

import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import MenuItem from "../../components/ui/MenuItem";
import FormInput from "../../components/ui/FormInput";
import FormSelect from "../../components/ui/FormSelect";

export default function AddAnnouncementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const [activeItem, setActiveItem] = useState("profile");
  const [selectedOption, setSelectedOption] = useState("");

  const handlePasswordChange = (field: string, value: string | boolean) => {
    setPasswordFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    console.log("Password changed successfully:", passwordFields);
    setIsModalOpen(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-full max-w-[1300px] mx-auto px-4 flex-grow mt-[35px]">
        {/* Progress Section */}
        <div className="w-full">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
              <span className="font-bold text-lg">!</span>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800">25%</span>
                <span className="text-sm text-gray-500">
                  Заполните полностью профиль и получите доступ к функции
                  "Поделиться профилем"
                </span>
              </div>
              <div className="w-full h-2 bg-gray-300 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: "55%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-10 mt-[35px]">
          {/* Sidebar */}
          <div className="flex-none bg-white rounded-[10px] border border-gray-300 w-1/4 min-h-full">
            <div className="relative flex justify-center mt-[30px]">
              <div className="w-[130px] h-[130px] rounded-full overflow-hidden relative">
                <Image
                  src={"/prof.svg"}
                  alt={"Profile Image"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <button className="absolute bottom-2 right-[10.5rem] bg-[#252525] p-2 rounded-full text-white shadow-lg flex items-center justify-center">
                <Image src={"/pencil.svg"} alt="Edit" width={14} height={14} />
              </button>
            </div>
            <div className="text-center mt-5 mb-20">
              <h2 className="text-base font-medium text-gray-900">
                Алихан Оспанов
              </h2>
            </div>
            <nav className="space-y-7">
              <MenuItem
                label="Профиль"
                isActive={activeItem === "profile"}
                onClick={() => setActiveItem("profile")}>
                <Image
                  src={"/user.svg"}
                  alt="Profile Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Мои отклики"
                isActive={activeItem === "responses"}
                onClick={() => setActiveItem("responses")}>
                <Image
                  src={"/reply.svg"}
                  alt="Responses Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Мои объявления"
                href={"/announcements"}
                isActive={activeItem === "announcements"}
                onClick={() => setActiveItem("announcements")}>
                <Image
                  src={"/announcement.svg"}
                  alt="Announcement Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
              <MenuItem
                label="Анкета"
                isActive={activeItem === "questionnaire"}
                onClick={() => setActiveItem("questionnaire")}>
                <Image
                  src={"/edit.svg"}
                  alt="Questionnaire Icon"
                  width={20}
                  height={20}
                />
              </MenuItem>
            </nav>
          </div>

          {/* Profile Form */}
          <div className="flex-auto bg-white rounded-[10px] border border-gray-300 w-full p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Имя" defaultValue="Алихан" disabled />
              <FormInput label="Фамилия" defaultValue="Оспанов" disabled />
              <FormInput
                label="Email"
                defaultValue="alikhaaan96@gmail.com"
                type="email"
                disabled
              />
              <FormInput
                label="Номер телефона"
                defaultValue="+7 747 447 54 40"
                type="text"
                disabled
              />
              <FormInput label="Дата рождения" type="date" />
              <FormSelect
                label="Гендер"
                options={[
                  { value: "male", label: "Мужской" },
                  { value: "female", label: "Женский" },
                ]}
                defaultValue={selectedOption}
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-52">
              <button
                onClick={() => setIsModalOpen(true)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100">
                Изменить пароль
              </button>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                Редактировать
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
