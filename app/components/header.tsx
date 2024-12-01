"use client";
import React, { useState, useEffect } from "react";
import citiesData from "../login/result.json"; // JSON файлын импорттау
import { json } from "stream/consumers";
import * as Images from "../../public/images";
import { useModal } from "../context/modal-context";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("Kazakh");

  const [selectedCity, setSelectedCity] = useState("Астана");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [address, setAdress] = useState({
    regionOrCityName: "Весь Казахстан",
    districtName: "",
    microDistrictName: "",
  });

  const [district, setDistrict] = useState({});
  const [microDistrcit, setMicroDistrcit] = useState({});

  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isMicroDistrictDropdownOpen, setIsMicroDistrictDropdownOpen] =
    useState(false);

  const all_addresses = citiesData;

  const [selectedAddress, setSelectedAddress] = useState("Астана");

  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("1");

  const isLogin = true;

  const languages = [
    { id: 1, name: "Kazakh", icon: <Images.FlagKaz /> },
    {
      id: 2,
      name: "Russian",
      icon: <Images.FlagRu />,
    },
  ];

  const numberRoom = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5+" },
  ];

  const cities = [
    { id: 1, name: "Астана" },
    { id: 2, name: "Алматы" },
    { id: 3, name: "Шымкент" },
    { id: 4, name: "Орал" },
    { id: 5, name: "Қарағанды" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAddressDropdown = () => {
    setIsAddressDropdownOpen(!isAddressDropdownOpen);
    console.log(1);
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const togglePriceDropdown = () => setIsPriceDropdownOpen((prev) => !prev);

  const toggleRoomDropdown = () => {
    setIsRoomDropdownOpen(!isRoomDropdownOpen);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxPrice - 1000);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minPrice + 1000);
    setMaxPrice(value);
  };
  const { openModal } = useModal();

  return (
    <header className="min-w-full">
      <div className="max-w-[1300px] mx-auto mt-6 space-y-3">
        <section className="flex flex-row justify-between">
          <div className="relative flex items-start space-x-2">
            <Images.Location />
            {/* <a className="underline underline-offset-2 pr-2">Астана</a> */}
            <a
              onClick={toggleCityDropdown}
              className="underline underline-offset-2 pr-2 cursor-pointer">
              {selectedCity}
            </a>
            {isCityDropdownOpen && (
              <div className="absolute top-6 left-3 w-[130px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-2 flex flex-col gap-1">
                  {cities.map((city) => (
                    <li
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city.name);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`flex rounded py-1 px-2 mx-2 cursor-pointer ${
                        selectedCity === city.name
                          ? "bg-[#1aa68383] text-white"
                          : ""
                      }`}>
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle and Language Dropdown */}

          <div className="relative flex items-center space-x-5">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-[56px] h-[26px] flex items-center rounded-[5px] transition-colors outline-none  ${
                isDarkMode ? "bg-[#252525]" : "border border-gray-200"
              }`}>
              {/* Light Icon */}
              <div
                className={`absolute right-2 transition-opacity duration-300 ${
                  isDarkMode ? "opacity-0" : "opacity-100"
                }`}>
                <Images.LightModeIcon className="w-5 h-5 " />
              </div>
              {/* Dark Icon */}
              <div
                className={`absolute left-2 transition-opacity duration-300 ${
                  isDarkMode ? "opacity-100" : "opacity-0"
                }`}>
                <Images.DarkModeIcon className="w-5 h-5 text-white" />
              </div>
            </button>
            <div
              className="flex items-center space-x-2"
              onClick={toggleDropdown}>
              {languages.find((lang) => lang.name === selectedLanguage)?.icon}
              <Images.arrowDown />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 top-7 w-[120px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-2 flex flex-col gap-1">
                  {languages.map((i) => (
                    <li
                      key={i.id}
                      onClick={() => {
                        setSelectedLanguage(i.name);
                        toggleDropdown();
                      }}
                      className={`flex items-center justify-around rounded py-1 mx-2 cursor-pointer ${
                        selectedLanguage === i.name
                          ? "bg-[#1aa68383] text-white"
                          : ""
                      }`}>
                      {i.icon}
                      {i.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Images.Logo className="w-[50px] h-[50px]" />
            <h1 className="font-circular font-semibold text-[28px] leading-[38px]">
              Şañyraq
            </h1>
          </div>
          {isLogin && (
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center justify-around p-2 h-[60px] bg-white border border-gray-300 rounded-md shadow-md min-w-[700px]">
                <div
                  className="cursor-pointer font-circular flex w-3/5 pl-4 items-center border-r-2 text-[#252525] font-medium text-[16px] leading-5"
                  onClick={toggleAddressDropdown}>
                  {address.regionOrCityName}
                </div>

                {isAddressDropdownOpen && (
                  <div className="flex flex-col p-[16px] justify-between items-end absolute top-[70px] left-0 h-[514px] bg-white border border-gray-200 shadow-lg rounded-[5px]">
                    <div className="w-full p-[11px] flex items-center border-[1px] border-[#D6D6D6] rounded-[5px] text-[#B5B7C0] text-[14px] font-weight: 400 leading-[17.5px] ">
                      <input
                        className="w-full border-none outline-none "
                        type="text"
                        placeholder="Поиск по городу"
                      />
                      <Images.SearchIconGray />
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="w-[214px] h-[380px] border-[1px] border-[#D6D6D6] rounded-[5px] overflow-y-auto scrollbar">
                        <ul className="flex flex-col  gap-1 max-h-[380px] ">
                          <li
                            onClick={() => {
                              setAdress((prevState) => ({
                                ...prevState,
                                regionOrCityName: "Весь Казахстан", // Ensure the key is correct
                              }));
                              setIsDistrictDropdownOpen(false);
                              setDistrict({});
                              setMicroDistrcit({});
                            }}
                            className={`flex p-[12px] cursor-pointer ${
                              "Весь Казахстан" == address.regionOrCityName
                                ? "bg-[#1aa68383] text-white"
                                : ""
                            }`}>
                            Весь Казахстан
                          </li>
                          {all_addresses.map((city) => (
                            <li
                              key={city.id}
                              onClick={() => {
                                setAdress((prevState) => ({
                                  ...prevState,
                                  regionOrCityName: city.name,
                                }));
                                setDistrict(city);
                                setIsDistrictDropdownOpen(true);
                              }}
                              className={`flex p-[12px] cursor-pointer ${
                                address.regionOrCityName === city.name
                                  ? "bg-[#1aa68383] text-white"
                                  : ""
                              }`}>
                              {city.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {isDistrictDropdownOpen &&
                        district &&
                        district?.children &&
                        district.children.length > 0 && (
                          <div className="w-[214px] h-[380px] border-[1px] border-[#D6D6D6] rounded-[5px] overflow-y-auto scrollbar">
                            {district.children.map((d) => (
                              <li
                                key={d.id}
                                onClick={() => {
                                  setAdress((prevState) => ({
                                    ...prevState,
                                    districtName: d.name,
                                  }));
                                  setMicroDistrcit(d);
                                  setIsMicroDistrictDropdownOpen(true);
                                }}
                                className={`flex p-[12px] cursor-pointer ${
                                  address.districtName === d.name
                                    ? "bg-[#1aa68383] text-white"
                                    : ""
                                }`}>
                                {d.name}
                              </li>
                            ))}
                          </div>
                        )}

                      {isMicroDistrictDropdownOpen &&
                        microDistrcit &&
                        microDistrcit?.children &&
                        microDistrcit.children.length > 0 && (
                          <div className="w-[214px] h-[380px] border-[1px] border-[#D6D6D6] rounded-[5px] overflow-y-auto scrollbar">
                            {microDistrcit.children.map((m) => (
                              <li
                                key={m.id}
                                onClick={() => {
                                  setAdress((prevState) => ({
                                    ...prevState,
                                    microDistrictName: m.name,
                                  }));
                                }}
                                className={`flex p-[12px] cursor-pointer ${
                                  address.microDistrictName === m.name
                                    ? "bg-[#1aa68383] text-white"
                                    : ""
                                }`}>
                                {m.name}
                              </li>
                            ))}
                          </div>
                        )}
                    </div>
                    <div>
                      <button className="font-circular font-bold text-[14px] text-[#FFFFFF] leading-[17.5px] tracking-[0.2px] bg-[#32343A] px-[55px] py-[12px] rounded-[5px] ">
                        Выбрать
                      </button>
                    </div>
                  </div>
                )}

                {/* Dropdown Content */}
                <div
                  onClick={togglePriceDropdown}
                  className="font-circular w-1/2 text-center border-r-2 text-[#252525] font-medium text-[16px] leading-5">
                  {minPrice} - {maxPrice}
                </div>

                {isPriceDropdownOpen && (
                  <div
                    className="flex flex-col absolute top-[70px] left-0 w-[500px] bg-white border border-gray-200 rounded-[5px] shadow-lg p-4 space-y-[24px] text-[#252525] text-[14px] leading-[17.5px] font-normal"
                    onBlur={() => setIsPriceDropdownOpen(false)}>
                    <h3 className="">Выберите цену</h3>
                    <div className="flex space-x-4 mb-6">
                      <input
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="w-full border border-gray-200 rounded-[5px] px-[10px] py-[9px] focus:outline-none focus:ring-2 focus:ring-[#1aa683]"
                        placeholder="Минимальный"
                      />
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="flex w-full border border-gray-200 rounded-[5px] px-[10px] py-[9px] focus:outline-none focus:ring-2 focus:ring-[#1aa683]"
                        placeholder="Максимальный"
                      />
                    </div>

                    <div className="relative">
                      <div className="flex justify-between text-[##1aa683] font-semibold mb-[5px]">
                        <span>0</span>
                        <span>500000</span>
                      </div>

                      <div className="relative">
                        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-md transform -translate-y-1/2" />

                        <div
                          className="absolute top-1/2 h-1 bg-[#1aa683] rounded-md transform -translate-y-1/2"
                          style={{
                            left: `${(minPrice / 500000) * 100}%`,
                            right: `${100 - (maxPrice / 500000) * 100}%`,
                          }}
                        />

                        <input
                          type="range"
                          min="0"
                          max="500000"
                          value={maxPrice}
                          onChange={(e) =>
                            setMaxPrice(
                              Math.max(Number(e.target.value), minPrice + 1000)
                            )
                          }
                          className="absolute top-1/2 w-[100%] h-1 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto custom-range"
                        />

                        <input
                          type="range"
                          min="0"
                          max="500000"
                          value={minPrice}
                          onChange={(e) =>
                            setMinPrice(
                              Math.min(Number(e.target.value), maxPrice - 1000)
                            )
                          }
                          className="absolute top-1/2 w-[100%] h-1 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto custom-range"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div
                  onClick={toggleRoomDropdown}
                  className="font-circular flex w-1/3 pl-4 text-[#252525] font-medium text-[16px] leading-5 cursor-pointer select-none">
                  {selectedRoom} жителей
                </div>

                {isRoomDropdownOpen && (
                  <div className="absolute top-[70px] left-0 p-[20px] space-y-[24px] bg-white border border-gray-200 rounded-md shadow-lg text-[#252525]">
                    <div className="font-normal text-[14px] leading-[17.5px]">
                      Количество сожителей
                    </div>
                    <ul className="flex justify-between space-x-[7px]">
                      {numberRoom.map((room) => (
                        <li
                          key={room.id}
                          onClick={() => {
                            setSelectedRoom(room.name);
                            setIsRoomDropdownOpen(false);
                          }}
                          className={`flex items-center justify-center px-[12px] py-[4px] bg-[#D1EDE6] rounded-[5px] cursor-pointer font-normal text-[14px] leading-[17.5px] `}>
                          {room.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="flex justify-center items-center w-[30px] h-[30px] bg-[#1aa683] rounded">
                  <Images.SearchIcon className="w-[16px] h-[16px]" />
                </button>
              </div>
              <div></div>
            </div>
          )}
          <div className="font-circular flex flex-row justify-between space-x-[8px]">
            {!isLogin && (
              <button className="flex justify-center items-center space-x-2 text-[#1aa683] font-bold px-[25px] h-[50px] rounded">
                <span>Войти</span>
              </button>
            )}
            <button
              className="flex justify-center items-center space-x-2 bg-[#1aa683] text-white font-bold px-[25px] h-[50px] rounded"
              onClick={openModal}>
              <span>Подать объявление</span>
              <Images.ArrowRight />
            </button>
            {!isLogin && (
              <button className="flex items-center space-x-2 px-[9px] h-[50px] rounded border border-[#1aa683]">
                <Images.UserIcon className="w-[32px] h-[32px]" />
              </button>
            )}
          </div>
        </section>
        <hr />
      </div>
    </header>
  );
};
export default Header;
