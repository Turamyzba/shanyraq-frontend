"use client";

import Image from "next/image";
import axiosInstance from "@/axiosInstance/axios";
import * as Images from "@/public/images";
import { useEffect, useState } from "react";

export default function ProfilePage({ formData, setFormData, fetchProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isNewModalShow, setIsNewModalShow] = useState(false);

  // Single state for all password fields
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Single state for visibility toggles of each password field
  const [passwordVisibility, setPasswordVisibility] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const openModal = () => {
    // Reset password fields and open modal
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setIsModalShow(true);
  };

  const closeModal = () => {
    setIsModalShow(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { newPassword, confirmPassword, oldPassword } = passwordData;
      if (newPassword !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
      const response = null;
      if (!formData.hasPassword) {
        await axiosInstance.post("/profile/add-password", {
          password: newPassword,
        });
      } else {
        await axiosInstance.post("/profile/update-password", {
          oldPassword,
          newPassword,
        });
      }

      alert("Password changed successfully");
      fetchProfile();

      closeModal();
    } catch (error: any) {
      console.error(
        "Entered incorrect password :",
        error.response?.data || error.message
      );
      alert(error.response?.data || "Entered incorrect password!");
    }
    // Passwords match, handle updating formData or actual logic here
  };

  const handlePasswordChange = (
    field: "oldPassword" | "newPassword" | "confirmPassword",
    value: string
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };
  const toggleVisibility = (field: "old" | "new" | "confirm") => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field: string, value: string) => {
    setProfileDatas((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      // If the date is invalid, return the default value "2024-12-03"
      return "";
    }
    return parsedDate.toISOString().split("T")[0]; // Formats as "YYYY-MM-DD"
  };

  const [profileDatas, setProfileDatas] = useState({
    firstName: formData.firstName || "",
    lastName: formData.lastName || "",
    phone: formData.phone || "",
    birthDate: formatDate(formData.birthDate) || "",
    gender: formData.gender,
  });

  useEffect(() => {
    // fetchProfile();
    setProfileDatas(() => ({
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      phone: formData.phone || "",
      birthDate: formatDate(formData.birthDate) || "",
      gender: formData.gender,
    }));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      handleEditToggle();
      return;
    }
    try {
      const response = await axiosInstance.put("/profile/edit", {
        firstName: profileDatas.firstName,
        lastName: profileDatas.lastName,
        phoneNumber: profileDatas.phone,
        birthDate: formatDate(profileDatas.birthDate),
        gender: profileDatas.gender,
      });

      console.log("Profile datas successfully", response);
      fetchProfile();
    } catch (error: any) {
      console.error(
        "Entered incorrect Profile datas :",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data || "Entered incorrect Profile datas!");
    }
    // Process form data
    // console.log("Form Submitted:", formData);
    setIsEditing(false);
  };

  return (
    <>
      <form className="flex-auto bg-white rounded-[10px] border-[1px] border-[#B5B7C0] w-full p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Имя */}
          <div className="flex flex-col gap-[12px] w-full">
            <label className="block text-[14px] font-[400] leading-[17.5px] text-[#25252580]">
              Имя:
            </label>
            <input
              type="text"
              value={isEditing ? profileDatas.firstName : formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={!isEditing}
              placeholder="Введите имя"
              className={`${
                isEditing ? "cursor-text" : "cursor-not-allowed"
              }  w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:border-[#1132F5] placeholder:text-[#B5B7C0]`}
            />
          </div>

          {/* Фамилия */}
          <div className="flex flex-col gap-[12px] w-full">
            <label className="block text-[14px] font-[400] leading-[17.5px] text-[#25252580]">
              Фамилия:
            </label>
            <input
              type="text"
              value={
                isEditing
                  ? profileDatas.lastName
                  : formData.lastName || profileDatas.lastName
              }
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={!isEditing}
              placeholder="Введите фамилию"
              className={`${
                isEditing ? "cursor-text" : "cursor-not-allowed"
              }  w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:border-[#1132F5] placeholder:text-[#B5B7C0]`}
            />
          </div>

          {/* Email (always disabled) */}
          <div className="flex flex-col gap-[12px] w-full">
            <label className="block text-[14px] font-[400] leading-[17.5px] text-[#25252580]">
              Email:
            </label>
            <input
              type="email"
              value={formData.email}
              disabled={true}
              className={`cursor-not-allowed w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:border-[#1132F5] placeholder:text-[#B5B7C0]`}
            />
          </div>

          {/* Номер телефона */}
          <div className="flex flex-col gap-[12px] w-full">
            <label className="block text-[14px] font-[400] leading-[17.5px] text-[#25252580]">
              Номер телефона:
            </label>
            <input
              type="text"
              value={
                isEditing
                  ? profileDatas.phone
                  : formData.phone || profileDatas.phone
              }
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={!isEditing}
              placeholder="Введите номер телефона"
              className={`${
                isEditing ? "cursor-text" : "cursor-not-allowed"
              }  w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:border-[#1132F5] placeholder:text-[#B5B7C0]`}
            />
          </div>

          {/* Дата рождения */}
          <div className="flex flex-col gap-[12px] w-full">
            <label className="block text-[14px] font-[400] leading-[17.5px] text-[#25252580]">
              Дата рождения:
            </label>
            <input
              type="date"
              value={
                isEditing
                  ? profileDatas.birthDate
                  : formData.birthDate || profileDatas.birthDate
              }
              onChange={(e) => {
                setProfileDatas((prev: any) => ({
                  ...prev,
                  birthDate: formatDate(e.target.value),
                }));
              }}
              disabled={!isEditing}
              className={`${
                isEditing ? "cursor-text" : "cursor-not-allowed"
              }  w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:border-[#1132F5]`}
            />
          </div>

          {/* Гендер */}
          <div className="flex flex-col gap-[12px] w-full">
            <label className="block text-[14px] font-[400] leading-[17.5px] text-[#25252580]">
              Гендер:
            </label>
            <select
              value={
                isEditing
                  ? profileDatas.gender
                  : formData.gender || profileDatas.gender
              }
              onChange={(e) => handleChange("gender", e.target.value)}
              disabled={!isEditing}
              className={`${
                isEditing ? "cursor-text" : "cursor-not-allowed"
              }  w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:border-[#1132F5]`}
            >
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
              <option value="Любой">Любой</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-16 md:mt-[200px]">
          <button
            type="button"
            onClick={() => {
              formData.hasPassword ? openModal() : setIsNewModalShow(true);
            }}
            className="border-[1px] border-[#B5B7C0] text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Изменить пароль
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            {isEditing ? "Сохранить изменения" : "Редактировать"}
          </button>
        </div>
      </form>

      {isModalShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-semibold mb-6 text-[#252525]">
              Поменяйте свой пароль
            </h2>

            {/* Старый пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.old ? "text" : "password"}
                id="oldPassword"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  handlePasswordChange("oldPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
              />
              <label
                htmlFor="oldPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                  passwordData.oldPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}
              >
                Старый пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.oldPassword}
                onClick={() => toggleVisibility("old")}
              >
                {!passwordVisibility.old ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.oldPassword ? "#1132F5" : "gray"}`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.oldPassword ? "#1132F5" : "gray"}`}
                  />
                )}
              </button>
            </div>

            {/* Новый пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.new ? "text" : "password"}
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
              />
              <label
                htmlFor="newPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                  passwordData.newPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}
              >
                Новый пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.newPassword}
                onClick={() => toggleVisibility("new")}
              >
                {!passwordVisibility.new ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.newPassword ? "#1132F5" : "gray"}`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.newPassword ? "#1132F5" : "gray"}`}
                  />
                )}
              </button>
            </div>

            {/* Подтвердите пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.confirm ? "text" : "password"}
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                  passwordData.confirmPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}
              >
                Подтвердите пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.confirmPassword}
                onClick={() => toggleVisibility("confirm")}
              >
                {!passwordVisibility.confirm ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${
                      passwordData.confirmPassword ? "#1132F5" : "gray"
                    }`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordVisibility.confirm ? "#1132F5" : "gray"}`}
                  />
                )}
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="bg-[#1132F5] text-white px-6 py-2 rounded-lg hover:bg-[#158f72] w-full text-center"
              >
                Подтвердить
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 w-full text-center"
              >
                Отменить
              </button>
            </div>
          </form>
        </div>
      )}
      {isNewModalShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-semibold mb-6 text-[#252525]">
              Добавьте свой пароль
            </h2>

            {/* Новый пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.new ? "text" : "password"}
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
              />
              <label
                htmlFor="newPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                  passwordData.newPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}
              >
                Новый пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.newPassword}
                onClick={() => toggleVisibility("new")}
              >
                {!passwordVisibility.new ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.newPassword ? "#1132F5" : "gray"}`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordData.newPassword ? "#1132F5" : "gray"}`}
                  />
                )}
              </button>
            </div>

            {/* Подтвердите пароль */}
            <div className="relative mb-[20px]">
              <input
                type={!passwordVisibility.confirm ? "text" : "password"}
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                required
                placeholder=""
                className="peer w-full px-3 py-[8px] text-[20px] font-normal text-left text-gray-900 border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:border-[#1132F5]"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 bg-white text-gray-400 font-normal transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-[-7px] peer-focus:px-[4px] peer-focus:text-xs peer-focus:text-[#1132F5] ${
                  passwordData.confirmPassword
                    ? "top-[-7px] px-[4px] text-xs"
                    : "text-[20px]"
                }`}
              >
                Подтвердите пароль
              </label>
              <button
                className="absolute right-4 bottom-3 cursor-pointer"
                type="button"
                disabled={!passwordData.confirmPassword}
                onClick={() => toggleVisibility("confirm")}
              >
                {!passwordVisibility.confirm ? (
                  <Images.eyeOn
                    className="w-[20px] h-[20px]"
                    color={`${
                      passwordData.confirmPassword ? "#1132F5" : "gray"
                    }`}
                  />
                ) : (
                  <Images.eyeOff
                    className="w-[20px] h-[20px]"
                    color={`${passwordVisibility.confirm ? "#1132F5" : "gray"}`}
                  />
                )}
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="bg-[#1132F5] text-white px-6 py-2 rounded-lg hover:bg-[#158f72] w-full text-center"
              >
                Подтвердить
              </button>
              <button
                type="button"
                onClick={() => setIsNewModalShow(false)}
                className="text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 w-full text-center"
              >
                Отменить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
