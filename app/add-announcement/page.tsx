"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useModal } from "../context/modal-context";
import * as Images from "@/public/images";
import { Slider } from "@mui/material";
import ALL_ADDRESSES from "@/app/result.json";
import ToggleButton from "../../components/toggle";
import { useRouter } from "next/navigation";
import axiosInstance from "@/axiosInstance/axios";
import { FileUpload } from "../../components/file-upload";

const AddAnnouncementModal = () => {
  const router = useRouter();
  const { isModalOpen, closeModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "Я житель",
    title: "",
    gender: "",
    roommates: 1,
    peopleInApartment: 0,
    region: "",
    district: "",
    microDistrict: "",
    address: "",
    moveInDate: "",
    monthlyPayment: "",
    livingInHome: true,
    ageRange: [18, 50],
    deposit: false,
    depositAmount: 0,
    apartmentDetails: {
      petsAllowed: false,
      utilitiesIncluded: false,
      utilitiesAmount: [0, 5000],
      forStudents: false,
      badHabitsAllowed: false,
      description: "",
      photos: [],
      rooms: "1",
      propertyType: "",
      floorsFrom: 1,
      floorsTo: 3,
      ownerPhone: "",
      longTerm: false,
      roomSize: 0,
    },
    selectedAdjectives: [],
  });

  const handleSubmit = async () => {
    try {
      console.log("Form data before submission:", formData);
      // Prepare the data for the POST request based on the formData
      const requestData = {
        role: formData.role,
        title: formData.title,
        selectedGender: formData.gender,
        doYouLiveInThisHouse: formData.livingInHome, // Assume true if there are housemates
        howManyPeopleLiveInThisApartment: formData.peopleInApartment.toString(),
        numberOfPeopleAreYouAccommodating: formData.roommates,
        minAge: formData.ageRange[0], // Default to 0 if not specified
        maxAge: formData.ageRange[1], // Default to 0 if not specified
        region: formData.region, // Set default if missing
        district: formData.district, // Set default if missing
        microDistrict: formData.microDistrict, // Set default if missing
        address: formData.address,
        arriveDate: formatDate(formData.moveInDate), // Default to today's date or empty if not provided
        cost: parseInt(formData.monthlyPayment), // Parse monthlyPayment as a number
        quantityOfRooms: formData.apartmentDetails.rooms,
        isDepositRequired: formData.deposit,
        deposit: parseInt(formData.depositAmount.toString()),
        arePetsAllowed: formData.apartmentDetails.petsAllowed,
        isCommunalServiceIncluded: formData.apartmentDetails.utilitiesIncluded,
        minAmountOfCommunalService:
          formData.apartmentDetails.utilitiesAmount[0],
        maxAmountOfCommunalService:
          formData.apartmentDetails.utilitiesAmount[1],
        intendedForStudents: formData.apartmentDetails.forStudents,
        areBadHabitsAllowed: formData.apartmentDetails.badHabitsAllowed,
        apartmentsInfo: formData.apartmentDetails.description,
        images: formData.apartmentDetails.photos, // Assuming there are photos
        typeOfHousing: formData.apartmentDetails.propertyType, // Set default
        numberOfFloor: formData.apartmentDetails.floorsTo, // Adjust if necessary
        maxFloorInTheBuilding: formData.apartmentDetails.floorsFrom, // Adjust as per your data
        areaOfTheApartment: formData.apartmentDetails.roomSize, // Adjust if necessary
        forALongTime: formData.apartmentDetails.longTerm, // Adjust according to your data
        phoneNumber: formData.apartmentDetails.ownerPhone, // Assuming you store the owner's phone in formData
        preferences: formData.selectedAdjectives, // Assuming selectedAdjectives as preferences
      };

      // Send the data to the server
      const response = await axiosInstance.post(
        "/announcement/create",
        requestData
      );

      // Handle successful response
      console.log("Announcement created successfully", response);

      // Optionally, reset form data or redirect after successful submission
      setFormData({
        role: "Я житель",
        title: "",
        gender: "",
        roommates: 1,
        peopleInApartment: 0,
        region: "",
        district: "",
        microDistrict: "",
        address: "",
        moveInDate: "",
        monthlyPayment: "",
        deposit: false,
        livingInHome: true,
        ageRange: [18, 50],
        depositAmount: 0,
        apartmentDetails: {
          petsAllowed: false,
          utilitiesIncluded: false,
          utilitiesAmount: [0, 5000],
          forStudents: false,
          badHabitsAllowed: false,
          description: "",
          photos: [],
          rooms: "1",
          propertyType: "",
          floorsFrom: 1,
          floorsTo: 3,
          ownerPhone: "",
          longTerm: false,
          roomSize: 0,
        },
        selectedAdjectives: [],
      });

      setCurrentStep(1);
      closeModal();

      router.push("/landing"); // Redirect to login or another page after success
    } catch (error: any) {
      console.error("Announcement creation failed:", error);
    }
  };

  const steps = [
    { id: 1, name: "Роль", component: StepRole },
    { id: 2, name: "Основная информация", component: StepBasicInfo },
    {
      id: 3,
      name: "Основные детали квартиры",
      component: StepApartmentDetails,
    },
    {
      id: 4,
      name: "Дополнительные детали квартиры",
      component: StepApartmentAdditionallyDetails,
    },
    {
      id: 5,
      name: "Полные детали квартиры",
      component: StepApartmentFullDetails,
    },
    { id: 6, name: "Успех", component: StepSuccess },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      // If the date is invalid, return the default value
      return "2024-12-03";
    }
    return parsedDate.toISOString().split("T")[0]; // Formats as "YYYY-MM-DD"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60 ">
      {/* Modal Content */}
      <div className="relative h-auto w-[640px] bg-white rounded-lg shadow-lg px-[40px] py-[60px] mt-[80px] overflow-y-auto scrollbar max-h-[calc(100vh-100px)]">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={() => {
            if (currentStep === 6) handleSubmit();
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
            closeModal={closeModal}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;

function StepRole({ handleNext, formData, setFormData, closeModal }: any) {
  const [selectedRole, setSelectedRole] = useState(formData.role || "");
  const [error, setError] = useState<boolean>(false);

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    setError(false); // Reset error when a role is selected
  };

  const handleProceed = () => {
    if (selectedRole) {
      const role = selectedRole === "Я хозяин" ? "Я хозяин" : "Я житель";
      setFormData({
        ...formData,
        role: role,
      });
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
        {/* <button
          onClick={() => handleSelect("Я хозяин")}
          className={`w-full flex items-center border rounded-lg p-4 transition ${
            selectedRole === "Я хозяин"
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
        </button> */}

        {/* Option: Я житель */}
        <button
          onClick={() => handleSelect("Я житель")}
          className={`w-full flex items-center border rounded-lg p-4 transition ${
            selectedRole === "Я житель"
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

      <div className="flex justify-between items-center mt-[25px] pt-[25px] border-t-[1px]">
        <button
          className="px-[38px] py-[15px] text-[16px] font-bold leading-[20px] outline-none tracking-[0.2px] text-[#252525] border-[1px] border-[#252525] rounded-[5px]"
          onClick={() => closeModal()} // Reset role selection on cancel
        >
          Закрыть
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

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const validateForm = () => {
    if (title.trim().length >= 10 && gender && peopleInApartment) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };
  useEffect(() => {
    validateForm();
  }, [title, gender, peopleInApartment]);

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

  const handleAgeRangeChange = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as [number, number]);
  };

  return (
    <div className="flex flex-col gap-[36px]">
      <h2 className="text-[24px] font-circular font-semibold leading-[30px] text-[#252525] text-left mb-[14px]">
        Создание нового объявления
      </h2>

      {/* Title Input */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Заголовок объявления:
          {title.trim().length < 10 && (
            <p className="mt-4 text-[14px] font-normal text-red-500">
              минимум: 10 символов
            </p>
          )}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
        />
      </div>

      {/* Gender Selection */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Кого вы подселяете?
        </label>
        <div className="flex items-center justify-around gap-4">
          {["Мужчина", "Женщина", "Любой"].map((option) => (
            <div key={option} className="flex items-center gap-[12px]">
              {/* Show different icons based on selection */}
              {gender === option ? <Images.statusOn /> : <Images.statusOff />}

              <input
                type="radio"
                id={option}
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
                className="hidden"
              />

              <label
                htmlFor={option}
                className={`text-[16px] font-medium cursor-pointer ${
                  gender === option ? " text-[#1AA683] " : " text-[#B5B7C0]"
                }`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Living in Home */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Вы проживаете в этом доме?
        </label>
        <div className="flex items-center gap-4">
          {/* "Да" checkbox-like */}
          <label
            htmlFor="livingInHomeYes"
            className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none">
            Да
            <input
              type="checkbox"
              id="livingInHomeYes"
              checked={livingInHome}
              onChange={() => setLivingInHome(!livingInHome)}
              className="hidden"
            />
            <div
              className={`w-6 h-6 flex items-center ml-2 justify-center rounded border outline-none ${
                livingInHome ? "border-[#1AA683]" : "border-gray-300"
              }`}>
              {livingInHome && <Images.check />}
            </div>
          </label>
        </div>
      </div>

      {/* People in Apartment */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Сколько людей проживают в квартире? (не включая вас)
        </label>

        <ul className="flex ml-[20px] space-x-[16px]">
          {[1, 2, 3, 4, "5+"].map((room) => (
            <li
              key={room}
              onClick={() => {
                setPeopleInApartment(room);
                // setIsHousematesDropdownOpen(false);
              }}
              className={`${
                peopleInApartment == room
                  ? "bg-[#1AA683] text-[#FFFFFF]"
                  : "bg-[#D1EDE6] text-[#5c5c5c]"
              } flex items-center justify-center w-[50px] h-[40px] rounded-[5px] cursor-pointer font-normal text-[16px] leading-[20px] `}>
              {room}
            </li>
          ))}
        </ul>
      </div>

      {/* Number of Roommates */}
      <div className="flex flex-col gap-[12px] ">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-2">
          Сколько человек подселяете?
        </label>
        <div className="flex items-center justify-around w-[120px] h-[40px] ml-[20px] border rounded-lg text-[20px] border-gray-300">
          {/* Minus Button */}
          <button
            onClick={() => setRoommates((prev: any) => Math.max(prev - 1, 1))}
            className="">
            <Images.minus />
          </button>

          {/* Roommates Count Display */}
          <span className="text-[14px] font-normal text-center text-[#252525]">
            {roommates}
          </span>

          {/* Plus Button */}
          <button
            onClick={() => setRoommates((prev: any) => Math.min(prev + 1, 10))}
            className="">
            <Images.plus />
          </button>
        </div>
      </div>

      {/* Age Range */}
      <div className="flex flex-col">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525] mb-[40px]">
          Возрастной диапазон
        </label>
        <Slider
          value={ageRange}
          className="w-full
                    [&_span.MuiSlider-thumb]:w-[28px] [&_span.MuiSlider-thumb]:h-[28px]
                    [&_span.MuiSlider-thumb]:bg-[#1AA683] [&_span.MuiSlider-thumb]:rounded-[30px] [&_span.MuiSlider-thumb]:border-[6px] [&_span.MuiSlider-thumb]:border-white
                    [&_span.MuiSlider-track]:bg-[#1AA683] [&_span.MuiSlider-track]:border-none [&_span.MuiSlider-track]:h-[16px]
                    [&_span.MuiSlider-rail]:bg-[#1AA683] [&_span.MuiSlider-rail]:h-[16px]"
          onChange={handleAgeRangeChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} лет`}
          min={18}
          max={50}
          step={1}
        />
        <div className="flex justify-between mt-[10px]">
          <span className="w-[50px] h-[40px] border-[2px] rounded-[5px] border-[#EBEBEB] text-[16px] flex items-center justify-center text-[#B5B7C0]">
            {ageRange[0]}
          </span>
          <span className="w-[50px] h-[40px] border-[2px] rounded-[5px] border-[#EBEBEB] text-[16px] flex items-center justify-center text-[#B5B7C0]">
            {ageRange[1]}
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[25px] pt-[25px] border-t-[1px]">
        <button
          onClick={handleBack}
          className="px-[38px] py-[15px] text-[16px] font-bold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
          Отменить
        </button>
        <button
          onClick={handleSubmit}
          disabled={isNextDisabled}
          className={`px-[38px] py-[15px] text-[16px] font-bold leading-[20px] tracking-[0.2px] rounded-[5px] ${
            !isNextDisabled
              ? "bg-[#32343A] text-[#FFFFFF]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}>
          Следующий
        </button>
      </div>
    </div>
  );
}

function StepApartmentDetails({
  handleNext,
  handleBack,
  formData,
  setFormData,
}: any) {
  const [region, setRegion] = useState(formData.region || "");
  const [district, setDistrict] = useState(formData.district || "");
  const [microDistrict, setMicroDistrict] = useState(
    formData.microDistrict || ""
  );
  const [address, setAddress] = useState(formData.address || "");
  const [moveInDate, setMoveInDate] = useState(formData.moveInDate || "");
  const [monthlyPayment, setMonthlyPayment] = useState(
    formData.monthlyPayment || ""
  );
  const [rooms, setRooms] = useState(formData.rooms || "1");
  const [deposit, setDeposit] = useState(formData.deposit || false);
  const [depositAmount, setDepositAmount] = useState(
    formData.depositAmount || 0
  );

  const [regionsData, setRegionsData] = useState([]); // Fetch or import region data
  const [districtsData, setDistrictsData] = useState([]); // Fetch or import district data
  const [microDistrictsData, setMicroDistrictsData] = useState([]); // Fetch or import microdistrict data

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isMicroDistrictDropdownOpen, setIsMicroDistrictDropdownOpen] =
    useState(false);

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const validateForm = () => {
    if (
      address.trim() &&
      region &&
      district &&
      microDistrict &&
      moveInDate &&
      monthlyPayment &&
      (deposit ? depositAmount !== 0 : true)
    ) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [
    address,
    region,
    district,
    microDistrict,
    moveInDate,
    monthlyPayment,
    deposit,
    depositAmount,
  ]);

  // Handle region selection
  const handleRegionSelect = (regionName: string) => {
    setRegion(regionName);
    setDistrict(""); // Reset district and microdistrict
    setMicroDistrict("");
    setIsRegionDropdownOpen(false);

    const selectedRegion = regionsData.find((r: any) => r.name === regionName);
    setDistrictsData(selectedRegion ? selectedRegion.children : []);
  };

  // Handle district selection
  const handleDistrictSelect = (districtName: string) => {
    setDistrict(districtName);
    setMicroDistrict(""); // Reset microdistrict
    setIsDistrictDropdownOpen(false);

    const selectedDistrict = districtsData.find(
      (d: any) => d.name === districtName
    );
    setMicroDistrictsData(selectedDistrict ? selectedDistrict.children : []);
  };

  // Handle microdistrict selection
  const handleMicroDistrictSelect = (microDistrictName: string) => {
    setMicroDistrict(microDistrictName);
    setIsMicroDistrictDropdownOpen(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    setFormData({
      ...formData,
      region,
      district,
      microDistrict,
      address,
      moveInDate,
      monthlyPayment,
      rooms,
      deposit,
      depositAmount,
    });
    handleNext();
  };

  useEffect(() => {
    // Example: Fetching regions data or importing static data
    const fetchedRegions = ALL_ADDRESSES;
    setRegionsData(fetchedRegions);
  }, []);

  return (
    <div className="flex flex-col gap-[36px]">
      <h2 className="text-[24px] font-circular font-semibold leading-[30px] text-[#252525] text-left mb-[14px]">
        Детали квартиры
      </h2>

      {/* Region Selection */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Регион:
        </label>
        <div className="relative">
          <input
            type="text"
            value={region}
            onChange={() => {}}
            onClick={() => setIsRegionDropdownOpen(true)} // Show dropdown on focus
            placeholder="Выберите регион"
            className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
          />
          {isRegionDropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-[5px] max-h-[150px] overflow-y-auto">
              {regionsData.map((region: any) => (
                <div
                  key={region.name}
                  onClick={() => handleRegionSelect(region.name)}
                  className="p-[10px] cursor-pointer hover:bg-[#1AA683] hover:text-white">
                  {region.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* District Selection */}
      {region && (
        <div className="flex flex-col gap-[12px] w-full">
          <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
            Район:
          </label>
          <div className="relative">
            <input
              type="text"
              value={district}
              onChange={() => {}}
              onClick={() => setIsDistrictDropdownOpen(true)} // Show dropdown on focus
              placeholder="Выберите район"
              className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
            />
            {isDistrictDropdownOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-[5px] max-h-[150px] overflow-y-auto">
                {districtsData.map((district: any) => (
                  <div
                    key={district.name}
                    onClick={() => handleDistrictSelect(district.name)}
                    className="p-[10px] cursor-pointer hover:bg-[#1AA683] hover:text-white">
                    {district.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Microdistrict Selection */}
      {district && (
        <div className="flex flex-col gap-[12px] w-full">
          <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
            Микрорайон:
          </label>
          <div className="relative">
            <input
              type="text"
              value={microDistrict}
              onChange={() => {}}
              onClick={() => setIsMicroDistrictDropdownOpen(true)} // Show dropdown on focus
              placeholder="Выберите микрорайон"
              className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
            />
            {isMicroDistrictDropdownOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-[5px] max-h-[150px] overflow-y-auto">
                {microDistrictsData.map((microDistrict: any) => (
                  <div
                    key={microDistrict.name}
                    onClick={() =>
                      handleMicroDistrictSelect(microDistrict.name)
                    }
                    className="p-[10px] cursor-pointer hover:bg-[#1AA683] hover:text-white">
                    {microDistrict.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Address Input */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Адрес:
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Введите адрес"
          className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
        />
      </div>

      {/* Move-in Date Picker */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Дата заселения:
        </label>
        <input
          type="date"
          value={moveInDate}
          onChange={(e) => setMoveInDate(e.target.value)}
          className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
        />
      </div>

      {/* Monthly Payment Input */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Ежемесячный платеж:
        </label>
        <input
          type="number"
          value={monthlyPayment}
          onChange={(e) => setMonthlyPayment(e.target.value)}
          placeholder="Введите сумму"
          className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
        />
      </div>

      {/* Rooms Input */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Сколько комнат в квартире?
        </label>
        <ul className="flex ml-[20px] space-x-[16px]">
          {["1", "2", "3", "4", "5+"].map((room) => (
            <li
              key={room}
              onClick={() => {
                setRooms(room);
              }}
              className={`${
                rooms == room
                  ? "bg-[#1AA683] text-[#FFFFFF]"
                  : "bg-[#D1EDE6] text-[#5c5c5c]"
              } flex items-center justify-center w-[50px] h-[40px] rounded-[5px] cursor-pointer font-normal text-[16px] leading-[20px] `}>
              {room}
            </li>
          ))}
        </ul>
      </div>

      {/* Deposit Checkbox */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Есть ли депозит?
        </label>
        <div className="flex items-center gap-5">
          {/* "Yes" checkbox-like */}
          <label
            htmlFor="deposit"
            className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none py-[12px]">
            Да
            <input
              type="checkbox"
              id="deposit"
              checked={deposit}
              onChange={() => setDeposit(!deposit)}
              className="hidden"
            />
            <div
              className={`w-6 h-6 flex items-center ml-2 justify-center rounded border outline-none ${
                deposit ? "border-[#1AA683]" : "border-gray-300"
              }`}>
              {deposit && <Images.check />}
            </div>
          </label>
          {/* Deposit Amount Input */}
          <div
            className={`${
              deposit ? "block" : "hidden"
            }  flex flex-col gap-[12px] w-full`}>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Введите сумму"
              className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[25px] pt-[25px] border-t-[1px]">
        <button
          onClick={handleBack}
          className="px-[38px] py-[15px] text-[16px] font-bold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
          Отменить
        </button>
        <button
          onClick={handleSubmit}
          disabled={isNextDisabled}
          className={`px-[38px] py-[15px] text-[16px] font-bold leading-[20px] tracking-[0.2px] rounded-[5px] ${
            !isNextDisabled
              ? "bg-[#32343A] text-[#FFFFFF]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}>
          Следующий
        </button>
      </div>
    </div>
  );
}

function StepApartmentAdditionallyDetails({
  handleNext,
  handleBack,
  formData,
  setFormData,
}: any) {
  const [petsAllowed, setPetsAllowed] = useState(
    formData.apartmentDetails.petsAllowed || false
  );
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(
    formData.apartmentDetails.utilitiesIncluded || true
  );
  const [utilitiesAmount, setUtilitiesAmount] = useState(
    formData.apartmentDetails.utilitiesAmount || [0, 5000]
  );
  const [forStudents, setForStudents] = useState(
    formData.apartmentDetails.forStudents || false
  );
  const [badHabitsAllowed, setBadHabitsAllowed] = useState(
    formData.apartmentDetails.badHabitsAllowed || false
  );
  const [description, setDescription] = useState(
    formData.apartmentDetails.description || ""
  );
  const [photos, setPhotos] = useState(formData.apartmentDetails.photos || []);

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const validateForm = () => {
    if (description.trim().length >= 10 && photos.length >= 5) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };

  // Update the form data and proceed to the next step
  const handleSubmit = () => {
    setFormData({
      ...formData, // spread the previous form data
      apartmentDetails: {
        ...formData.apartmentDetails, // spread apartmentDetails to preserve other fields
        petsAllowed,
        utilitiesIncluded,
        utilitiesAmount,
        forStudents,
        badHabitsAllowed,
        description,
        photos,
      },
    });
    handleNext();
  };

  // Run validation on description or photos change
  useEffect(() => {
    validateForm();
  }, [
    petsAllowed,
    utilitiesIncluded,
    utilitiesAmount,
    forStudents,
    badHabitsAllowed,
    description,
    photos,
  ]);

  const handleUtilitiesAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAmount = [...utilitiesAmount];
    newAmount[index] = parseInt(e.target.value);
    setUtilitiesAmount(newAmount);
  };
  return (
    <div className="flex flex-col gap-[36px]">
      <h2 className="text-[24px] font-circular font-semibold leading-[30px] text-[#252525] text-left mb-[14px]">
        Детали квартиры
      </h2>

      {/* Pets Allowed */}
      <ToggleButton
        label="Разрешены ли питомцы?"
        value={petsAllowed}
        onChange={setPetsAllowed}
      />

      {/* Utilities Included */}
      <ToggleButton
        label="Включены ли коммунальные услуги?"
        value={utilitiesIncluded}
        onChange={setUtilitiesIncluded}
      />
      {!utilitiesIncluded && (
        <div className="flex items-center justify-between w-full">
          <label className="block text-[16px] font-normal leading-[20px] text-[#252525]">
            Введите сумму:
          </label>
          <div className="flex items-center gap-[12px]">
            <label className="block text-[16px] font-normal leading-[20px] text-[#252525]">
              от
            </label>
            <input
              type="number"
              value={utilitiesAmount[0]}
              onChange={(e) => handleUtilitiesAmountChange(e, 0)}
              placeholder="Минимум"
              className="w-[100px] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
            />
            <label className="block text-[16px] font-normal leading-[20px] text-[#252525]">
              до
            </label>
            <input
              type="number"
              value={utilitiesAmount[1]}
              onChange={(e) => handleUtilitiesAmountChange(e, 1)}
              placeholder="Максимум"
              className="w-[100px] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
            />
          </div>
        </div>
      )}

      {/* For Students */}
      <ToggleButton
        label="Для студентов?"
        value={forStudents}
        onChange={setForStudents}
      />

      {/* Bad Habits Allowed */}
      <ToggleButton
        label="Разрешены ли плохие привычки?"
        value={badHabitsAllowed}
        onChange={setBadHabitsAllowed}
      />

      {/* Description */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Описание квартиры:
          {description.trim().length < 10 && (
            <p className="mt-4 text-[14px] font-normal text-red-500">
              минимум: 10 символов
            </p>
          )}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание "
          className="w-full h-[150px] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683] placeholder:text-[#B5B7C0]"
        />
      </div>

      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Загрузите фотографии:
        </label>
        <FileUpload photos={photos} setPhotos={setPhotos} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[25px] pt-[25px] border-t-[1px]">
        <button
          onClick={handleBack}
          className="px-[38px] py-[15px] text-[16px] font-bold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
          Отменить
        </button>
        <button
          onClick={handleSubmit}
          disabled={isNextDisabled}
          className={`px-[38px] py-[15px] text-[16px] font-bold leading-[20px] tracking-[0.2px] rounded-[5px] ${
            !isNextDisabled
              ? "bg-[#32343A] text-[#FFFFFF]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}>
          Следующий
        </button>
      </div>
    </div>
  );
}

function StepApartmentFullDetails({
  handleNext,
  handleBack,
  formData,
  setFormData,
}: any) {
  const [propertyType, setPropertyType] = useState(
    formData.apartmentDetails.propertyType || ""
  );
  const [floorsFrom, setFloorsFrom] = useState(
    formData.apartmentDetails.floorsFrom || 1
  );
  const [floorsTo, setFloorsTo] = useState(
    formData.apartmentDetails.floorsTo || 3
  );
  const [roomSize, setRoomSize] = useState(
    formData.apartmentDetails.roomSize || ""
  );
  // const [complex, setComplex] = useState(formData.complex || "");
  // const [nearBy, setNearBy] = useState(formData.nearBy || "");
  const [longTerm, setLongTerm] = useState(
    formData.apartmentDetails.longTerm || false
  );
  // const [ownerName, setOwnerName] = useState(formData.ownerName || "");
  const [ownerPhone, setOwnerPhone] = useState(
    formData.apartmentDetails.ownerPhone || ""
  );
  // const [residentNames, setResidentNames] = useState(
  //   formData.residentNames || [""]
  // );
  // const [residentPhones, setResidentPhones] = useState(
  //   formData.residentPhones || [""]
  // );

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const validateForm = () => {
    if (
      propertyType &&
      floorsFrom >= 0 &&
      floorsTo >= 0 &&
      floorsFrom <= floorsTo &&
      roomSize > 0 &&
      ownerPhone
    ) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  };

  // Update the form data and proceed to the next step
  const handleSubmit = () => {
    setFormData({
      ...formData,
      apartmentDetails: {
        ...formData.apartmentDetails,
        propertyType,
        floorsFrom,
        floorsTo,
        roomSize,
        longTerm,
        ownerPhone,
      },
    });
    handleNext();
  };

  // Run validation on changes
  useEffect(() => {
    validateForm();
  }, [propertyType, floorsFrom, floorsTo, roomSize, longTerm, ownerPhone]);

  return (
    <div className="flex flex-col gap-[36px]">
      <h2 className="text-[24px] font-circular font-semibold leading-[30px] text-[#252525] text-left mb-[14px]">
        Полные детали квартиры
      </h2>

      {/* Property Type */}
      <div className="flex items-center gap-[160px]">
        <label
          htmlFor="propertyTypeApartment"
          className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            id="propertyTypeApartment"
            checked={propertyType === "Квартира"}
            onChange={() => setPropertyType("Квартира")}
            className="hidden"
          />
          <div
            className={`w-6 h-6 flex items-center mr-2 justify-center rounded border outline-none ${
              propertyType === "Квартира"
                ? "border-[#1AA683]"
                : "border-gray-300"
            }`}>
            {propertyType === "Квартира" && <Images.check />}
          </div>
          Квартира
        </label>

        <label
          htmlFor="propertyTypeHouse"
          className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            id="propertyTypeHouse"
            checked={propertyType === "Дом"}
            onChange={() => setPropertyType("Дом")}
            className="hidden"
          />
          <div
            className={`w-6 h-6 flex items-center mr-2 justify-center rounded border outline-none ${
              propertyType === "Дом" ? "border-[#1AA683]" : "border-gray-300"
            }`}>
            {propertyType === "Дом" && <Images.check />}
          </div>
          Дом
        </label>
      </div>

      {/* Floors */}
      <div className="flex gap-[16px] flex-col w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Сколько этажей?
        </label>
        <div className="flex items-center justify-between">
          <input
            type="number"
            value={floorsFrom}
            onChange={(e) => setFloorsFrom(parseInt(e.target.value))}
            className="w-1/2 border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
          />
          <label className="block text-[16px] px-[20px] font-normal leading-[20px] text-[#252525]">
            из
          </label>
          <input
            type="number"
            value={floorsTo}
            onChange={(e) => setFloorsTo(parseInt(e.target.value))}
            className="w-1/2 border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
          />
        </div>
      </div>

      {/* Room Size */}
      <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Какая площадь комнаты?
        </label>
        <input
          type="number"
          value={roomSize}
          placeholder="Введите площадь комнаты"
          onChange={(e) =>
            setRoomSize(parseInt(e.target.value.trim() ? e.target.value : "0"))
          }
          className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
        />
      </div>

      {/* Complex / Microdistrict */}
      {/* <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Выберите жилой комплекс/ микрорайон
        </label>
        <input
          type="text"
          disabled
          value={complex}
          onChange={(e) => setComplex(e.target.value)}
          placeholder="Поиск..."
          className="w-full border-[1px] font-normal border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
        />
      </div> */}

      {/* Nearby */}
      {/* <div className="flex flex-col gap-[12px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Пересечение с
        </label>
        <div className="flex items-center gap-[10px]">
          <input
            type="text"
            value={nearBy}
            disabled
            onChange={(e) => setNearBy(e.target.value)}
            placeholder="Находится возле..."
            className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
          />
          <ToggleButton
            label="На долгий срок?"
            value={longTerm}
            onChange={setLongTerm}
          />
        </div>
      </div> */}

      {/* Long Term */}
      <ToggleButton
        label="На долгий срок?"
        value={longTerm}
        onChange={setLongTerm}
      />

      <hr />

      {/* Owner Contact */}
      <div className="flex flex-col gap-[20px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Добавление номера телефоны
        </label>
        <div className="flex flex-col gap-[12px]">
          <input
            type="text"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
            required
            placeholder="Введите номер телефона"
            className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
          />
        </div>
        {/* <div className="flex flex-col gap-[12px]">
          <label className="block text-[16px] font-normal leading-[20px] text-[#252525]">
            Контактные телефоны
          </label>
          <div className="flex items-center justify-between">
            <label
              htmlFor="propertyTypeApartment"
              className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                id="propertyTypeApartment"
                checked={false}
                onChange={() => {}}
                className="hidden"
              />
              <div
                className={`w-6 h-6 flex items-center mr-2 justify-center rounded border outline-none ${
                  false ? "border-[#1AA683]" : "border-gray-300"
                }`}>
              </div>
              +7 747 777 66 55
            </label>
            <label className="flex items-center gap-[12px]">
              <Images.plus color={"#1AA683"} />
              <p className="text-[16px] font-normal leading-[20px] text-left text-[#1AA683]">
                Добавить еще телефоны
              </p>
            </label>
          </div>
        </div> */}
      </div>

      {/* <hr /> */}
      {/* Residents Contact */}
      {/* <div className="flex flex-col gap-[20px] w-full">
        <label className="block text-[16px] font-semibold leading-[20px] text-[#252525]">
          Добавление контактов жителей
        </label>
        <div className="flex flex-col gap-[12px]">
          <label className="block text-[16px] font-normal leading-[20px] text-[#252525]">
            Имя в личных сообщениях
          </label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Игорь"
            className="w-full border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-[16px] text-[#252525] outline-none focus:outline-none focus:border-[#1aa683]"
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <label className="block text-[16px] font-normal leading-[20px] text-[#252525]">
            Контактные телефоны
          </label>
          <div className="flex items-center justify-between">
            <label
              htmlFor="propertyTypeApartment"
              className="flex items-center text-[16px] text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                id="propertyTypeApartment"
                checked={false}
                onChange={() => {}}
                className="hidden"
              />
              <div
                className={`w-6 h-6 flex items-center mr-2 justify-center rounded border outline-none ${
                  false ? "border-[#1AA683]" : "border-gray-300"
                }`}>
              </div>
              +7 747 777 66 55
            </label>
            <label className="flex items-center gap-[12px]">
              <Images.plus color={"#1AA683"} />
              <p className="text-[16px] font-normal leading-[20px] text-left text-[#1AA683]">
                Добавить еще телефоны
              </p>
            </label>
          </div>
        </div>
      </div> */}

      {/* <button
        // onClick={handleBack}
        disabled
        className="w-full flex items-center justify-center gap-[12px] py-[16px] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
        <Images.plus color={"#252525"} />
        <p className="text-[16px] font-normal leading-[20px] text-left text-[#252525]">
          Добавить еще телефоны
        </p>
      </button> */}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[25px] pt-[25px] border-t-[1px]">
        <button
          onClick={handleBack}
          className="px-[38px] py-[15px] text-[16px] font-bold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
          Отменить
        </button>
        <button
          onClick={handleSubmit}
          disabled={isNextDisabled}
          className={`px-[38px] py-[15px] text-[16px] font-bold leading-[20px] tracking-[0.2px] rounded-[5px] ${
            !isNextDisabled
              ? "bg-[#32343A] text-[#FFFFFF]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}>
          Следующий
        </button>
      </div>
    </div>
  );
}

function StepSuccess({ formData, setFormData, closeModal, handleSubmit }: any) {
  const adjectives = [
    "Платежеспособная/ный",
    "Чистоплотная/ный",
    "Ответственная/ный",
    "Порядочная/ный",
    "Неконфликтная/ный",
    "Религиозная/ный",
    "Аккуратная/ный",
  ];

  const [selectedAdjectives, setSelectedAdjectives] = useState<string[]>([]);

  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      selectedAdjectives,
    }));
  }, [selectedAdjectives, setFormData]);

  const handleCheckboxChange = (adj: string) => {
    setSelectedAdjectives((prevSelected) =>
      prevSelected.includes(adj)
        ? prevSelected.filter((item) => item !== adj)
        : [...prevSelected, adj]
    );
  };

  return (
    <div className="flex flex-col gap-[50px]">
      <div className="w-[500px] mx-auto flex flex-col text-center gap-[32px] items-center justify-center">
        <Images.finished />
        <h2 className="text-[24px] font-circular font-semibold leading-[30px] text-[#252525] px-[50px]">
          Поздравляем! Ваше объявление успешно загружено.
        </h2>
      </div>

      <div className="flex flex-col gap-[20px]">
        <p className="text-[20px] text-[#252525] cursor-pointer">
          Каким вы предпочитаете видеть своего соседа?
        </p>

        <ul className=" text-[#252525] flex flex-col gap-[20px] mb-6">
          {adjectives.map((adj, index) => (
            <label
              htmlFor={adj}
              key={index}
              className="flex items-center text-[20px] text-[#252525] cursor-pointer select-none">
              <input
                type="checkbox"
                id={adj}
                checked={selectedAdjectives.includes(adj)}
                onChange={() => handleCheckboxChange(adj)}
                className="hidden"
              />
              {}
              <div
                className={`w-6 h-6 flex items-center mr-2 justify-center rounded border outline-none ${
                  selectedAdjectives.includes(adj)
                    ? "border-[#1AA683]"
                    : "border-gray-300"
                }`}>
                {selectedAdjectives.includes(adj) && <Images.check />}
              </div>
              {adj}
            </label>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-[25px] pt-[25px] border-t-[1px] text-[#FFFFFF]">
        <button
          onClick={handleSubmit}
          className="px-[38px] py-[15px] text-[16px] font-bold leading-[20px] tracking-[0.2px] rounded-[5px] bg-[#32343A]">
          Завершить
        </button>
      </div>
    </div>
  );
}
