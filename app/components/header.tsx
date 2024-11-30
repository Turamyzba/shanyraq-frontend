"use client";
import { useState } from "react";
import * as Images from "../../public/images";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Kazakh");
  const [selectedCity, setSelectedCity] = useState("Астана");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <header className="min-w-full">
      <div className="max-w-[1300px] mx-auto mt-6 space-y-3">
        <section className="flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Images.arrowDown />
            <a className="underline underline-offset-2 pr-2">Астана</a>
            <a className="underline underline-offset-2">Объявления</a>
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
              <div className="relative flex items-center justify-around p-2 h-[60px] bg-white border border-gray-300 rounded-md shadow-md w-[500px]">
                <div className="font-circular flex w-1/3 pl-4 items-center border-r-2 text-[#252525] font-medium text-[16px] leading-5">
                  {selectedCity}
                </div>
                <div
                  onClick={togglePriceDropdown}
                  className="font-circular w-1/2 text-center border-r-2 text-[#252525] font-medium text-[16px] leading-5">
                  {minPrice} - {maxPrice}
                </div>

                {/* Dropdown Content */}
                {isPriceDropdownOpen && (
                  <div className="flex flex-col absolute top-[70px] left-0 w-[500px] bg-white border border-gray-200 rounded-[5px] shadow-lg p-4 space-y-[24px] text-[#252525] text-[14px] leading-[17.5px] font-normal">
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
                          className="absolute top-1/2 w-[100%] h-1 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto custom-range z-10"
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
                          className="absolute top-1/2 w-[100%] h-1 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto custom-range z-10"
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
            </div>
          )}
          <div className="font-circular flex flex-row justify-between space-x-[8px]">
            {!isLogin && (
              <button className="flex justify-center items-center space-x-2 text-[#1aa683] font-bold px-[25px] h-[50px] rounded">
                <span>Войти</span>
              </button>
            )}
            <button className="flex justify-center items-center space-x-2 bg-[#1aa683] text-white font-bold px-[25px] h-[50px] rounded">
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
