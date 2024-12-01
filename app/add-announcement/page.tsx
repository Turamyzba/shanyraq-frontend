"use client";

import { useState } from "react";
import { useModal } from "../context/modal-context";
import * as Images from "@/public/images";

const AddAnnouncementModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    title: "",
    gender: "",
    housematesCount: 0,
    address: "",
    moveInDate: "",
    monthlyPayment: "",
    deposit: false,
    depositAmount: "",
    apartmentDetails: {
      petsAllowed: false,
      utilitiesIncluded: false,
      forStudents: false,
      smokingAllowed: false,
      description: "",
      photos: [],
    },
  });

  const steps = [
    { id: 1, name: "Роль", component: StepRole },
    { id: 2, name: "Основная информация", component: StepBasicInfo },
    { id: 3, name: "Детали квартиры", component: StepApartmentDetails },
    { id: 4, name: "Контакты", component: StepContacts },
    { id: 5, name: "Успех", component: StepSuccess },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60 ">
      {/* Modal Content */}
      <div className="relative h-auto w-[640px] bg-white rounded-lg shadow-lg px-[40px] py-[60px] mt-[100px]">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={() => {
            setCurrentStep(1);
            closeModal();
          }}>
          <Images.close />
        </button>
        <div className="flex flex-col items-between">
          <CurrentStepComponent
            formData={formData}
            setFormData={setFormData}
            handleNext={handleNext}
            handleBack={handleBack}
          />

          {/* <div className="flex justify-between items-center mt-[50px]">
            <button
              className="px-[38px] py-[15px] text-[16px] font-bold leading-[20px] outline-none tracking-[0.2px] text-[#252525] border-[1px] border-[#252525] rounded-[5px]"
              onClick={handleBack}>
              Отменить
            </button>
            <button
              onClick={handleNext}
              className="px-[38px] py-[15px] bg-[#32343A] text-[16px] font-bold leading-[20px] outline-none tracking-[0.2px] text-[#FFFFFF] rounded-[5px] ">
              Следующий
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;

function StepRole({ handleNext }: any) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    setError(false); // Reset error when a role is selected
  };

  const handleProceed = () => {
    if (selectedRole) {
      handleNext();
    } else {
      setError(true); // Display error if no role is selected
    }
  };

  return (
    <div className="w-full text-left">
      <h2 className="text-[24px] font-bold leading-[30px] tracking-[0.2px] text-[#252525] text-left underline-from-font decoration-skip-ink-none mb-[16px]">
        Кем вы являетесь?
      </h2>

      <p className="text-[16px] font-normal leading-[20px] text-[#252525] text-left underline-from-font decoration-skip-ink-none mb-[50px]">
        Выберите роль, чтобы мы могли предложить подходящие функции
      </p>

      <div className="space-y-4">
        {/* Option: Я хозяин */}
        <button
          onClick={() => handleSelect("owner")}
          className={`w-full flex items-center border rounded-lg p-4 transition ${
            selectedRole === "owner"
              ? "border-[#1AA683] bg-[#E6F8F2]"
              : "border-gray-300 hover:bg-gray-100"
          }`}>
          <div className="flex items-center gap-[36px] w-full">
            <div className="min-w-[150px] h-[150px] flex items-center justify-center">
              <Images.roleOwner />
            </div>
            <div className="text-left flex flex-col gap-[16px]">
              <p className="text-[20px] font-bold leading-[25px] text-[#252525] text-left underline-from-font decoration-skip-ink-none">
                Я хозяин
              </p>
              <p className="text-[16px] font-semibold leading-[20px] text-[#252525] text-left underline-from-font decoration-skip-ink-none">
                Эта опция для вас, если вы сдаёте жильё или предлагаете услуги
              </p>
            </div>
          </div>
        </button>

        {/* Option: Я житель */}
        <button
          onClick={() => handleSelect("tenant")}
          className={`w-full flex items-center border rounded-lg p-4 transition ${
            selectedRole === "tenant"
              ? "border-[#1AA683] bg-[#E6F8F2]"
              : "border-gray-300 hover:bg-gray-100"
          }`}>
          <div className="flex items-center gap-[36px] w-full">
            <div className="min-w-[150px] h-[150px] flex items-center justify-center">
              <Images.roleTenant />
            </div>
            <div className="text-left flex flex-col gap-[16px]">
              <p className="text-[20px] font-bold leading-[25px] text-[#252525] text-left underline-from-font decoration-skip-ink-none">
                Я житель
              </p>
              <p className="text-[16px] font-semibold leading-[20px] text-[#252525] text-left underline-from-font decoration-skip-ink-none">
                Эта опция для вас, если вы ищете жильё или услуги
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-4 text-[16px] font-semibold text-red-500">
          Пожалуйста, выберите роль перед продолжением
        </p>
      )}

      <div className="flex justify-between items-center mt-[50px]">
        <button
          className="px-[38px] py-[15px] text-[16px] font-bold leading-[20px] outline-none tracking-[0.2px] text-[#252525] border-[1px] border-[#252525] rounded-[5px]"
          onClick={() => setSelectedRole(null)} // Reset role selection on cancel
        >
          Отменить
        </button>
        <button
          onClick={handleProceed}
          className={`px-[38px] py-[15px] text-[16px] font-bold leading-[20px] tracking-[0.2px] rounded-[5px] ${
            selectedRole
              ? "bg-[#32343A] text-[#FFFFFF]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          // disabled={!selectedRole}
        >
          Следующий
        </button>
      </div>
    </div>
  );
}

function StepBasicInfo({ handleNext, handleBack, formData, setFormData }: any) {
  const [title, setTitle] = useState(formData.title || "");
  const [gender, setGender] = useState(formData.gender || "");
  const [livingInHome, setLivingInHome] = useState(
    formData.livingInHome || true
  );
  const [peopleInApartment, setPeopleInApartment] = useState(
    formData.peopleInApartment || 0
  );
  const [roommates, setRoommates] = useState(formData.roommates || 1);
  const [ageRange, setAgeRange] = useState(formData.ageRange || [18, 50]);

  const handleSubmit = () => {
    setFormData({
      ...formData,
      title,
      gender,
      livingInHome,
      peopleInApartment,
      roommates,
      ageRange,
    });
    handleNext();
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold leading-[30px] text-[#252525] mb-[16px]">
        Создание нового объявления
      </h2>

      {/* Title Input */}
      <div className="mb-6">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Заголовок объявления:
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          className="w-full border border-gray-300 rounded-lg p-3 text-[16px] text-[#252525] outline-none focus:ring-2 focus:ring-[#1AA683]"
        />
      </div>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Кого вы подселяете?
        </label>
        <div className="flex gap-4">
          {["Мужчина", "Женщина", "Любой"].map((option) => (
            <button
              key={option}
              onClick={() => setGender(option)}
              className={`px-6 py-3 border rounded-lg text-[16px] ${
                gender === option
                  ? "bg-[#1AA683] text-white border-[#1AA683]"
                  : "border-gray-300 text-[#252525] hover:bg-gray-100"
              }`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Living in Home */}
      <div className="mb-6">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Вы проживаете в этом доме?
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setLivingInHome(true)}
            className={`px-6 py-3 border rounded-lg text-[16px] ${
              livingInHome
                ? "bg-[#1AA683] text-white border-[#1AA683]"
                : "border-gray-300 text-[#252525] hover:bg-gray-100"
            }`}>
            Да
          </button>
          <button
            onClick={() => setLivingInHome(false)}
            className={`px-6 py-3 border rounded-lg text-[16px] ${
              !livingInHome
                ? "bg-[#1AA683] text-white border-[#1AA683]"
                : "border-gray-300 text-[#252525] hover:bg-gray-100"
            }`}>
            Нет
          </button>
        </div>
      </div>

      {/* People in Apartment */}
      <div className="mb-6">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Сколько людей проживают в квартире? (не включая вас)
        </label>
        <div className="flex gap-4">
          {[1, 2, 3, 4, "5+"].map((count) => (
            <button
              key={count}
              onClick={() => setPeopleInApartment(count)}
              className={`px-6 py-3 border rounded-lg text-[16px] ${
                peopleInApartment === count
                  ? "bg-[#1AA683] text-white border-[#1AA683]"
                  : "border-gray-300 text-[#252525] hover:bg-gray-100"
              }`}>
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Roommates */}
      <div className="mb-6">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Сколько человек подселяете?
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setRoommates((prev) => Math.max(prev - 1, 1))}
            className="w-[40px] h-[40px] flex items-center justify-center border rounded-lg text-[20px] border-gray-300 hover:bg-gray-100">
            -
          </button>
          <span className="text-[20px] font-bold text-[#252525]">
            {roommates}
          </span>
          <button
            onClick={() => setRoommates((prev) => prev + 1)}
            className="w-[40px] h-[40px] flex items-center justify-center border rounded-lg text-[20px] border-gray-300 hover:bg-gray-100">
            +
          </button>
        </div>
      </div>

      {/* Age Range */}
      <div className="mb-6">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Возрастной диапазон
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="18"
            max="50"
            value={ageRange[0]}
            onChange={(e) =>
              setAgeRange([parseInt(e.target.value), ageRange[1]])
            }
            className="w-full"
          />
          <span className="text-[16px] text-[#252525]">{ageRange[0]}</span>
          <span>-</span>
          <input
            type="range"
            min="18"
            max="50"
            value={ageRange[1]}
            onChange={(e) =>
              setAgeRange([ageRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <span className="text-[16px] text-[#252525]">{ageRange[1]}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[50px]">
        <button
          onClick={handleBack}
          className="px-[38px] py-[15px] text-[16px] font-bold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
          Отменить
        </button>
        <button
          onClick={handleSubmit}
          className="px-[38px] py-[15px] text-[16px] font-bold bg-[#32343A] text-white rounded-lg hover:bg-[#4a4a50]">
          Следующий
        </button>
      </div>
    </div>
  );
}

function StepApartmentDetails() {
  return (
    <div>
      <h2>Step 3: Apartment Details</h2>
    </div>
  );
}

function StepContacts() {
  return (
    <div>
      <h2>Step 4: Contacts</h2>
    </div>
  );
}

function StepSuccess() {
  return <h2>Step 5: Success</h2>;
}
