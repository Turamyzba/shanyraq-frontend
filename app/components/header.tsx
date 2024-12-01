"use client";
import React, { useState, useEffect } from "react";
import citiesData from "../login/result.json";
import * as Images from "../../public/images";
import { useModal } from "../context/modal-context";
import Slider from "@mui/material/Slider";

const Header = () => {
  const isLogin = true;

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

  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [gender, setGender] = useState("");

  const [housemates, setHousemates] = useState("");
  const [isHousematesDropdownOpen, setIsHousematesDropdownOpen] =
    useState(false);

  const genders = [
    { id: 1, name: "Мужской" },
    { id: 2, name: "Женский" },
  ];

  const housematesCount = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5+" },
  ];

  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const toggleAddressDropdown = () => {
    setIsAddressDropdownOpen(!isAddressDropdownOpen);
    console.log(1);
  };

  // const togglePriceDropdown = () => setIsPriceDropdownOpen((prev) => !prev);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);

  const toggleGenderDropdown = () =>
    setIsGenderDropdownOpen(!isGenderDropdownOpen);

  const toggleHousematesDropdown = () =>
    setIsHousematesDropdownOpen(!isHousematesDropdownOpen);

  const toggleAllDropDown = () => {
    setIsMicroDistrictDropdownOpen(false);
    setIsDistrictDropdownOpen(false);
    setIsAddressDropdownOpen(false);
    setIsDropdownOpen(false);
    setIsCityDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsGenderDropdownOpen(false);
    setIsHousematesDropdownOpen(false);
  };

  //New

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Kazakh");

  const [selectedCity, setSelectedCity] = useState("Астана");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const languages = [
    { id: 1, name: "Kazakh", icon: <Images.FlagKaz /> },
    {
      id: 2,
      name: "Russian",
      icon: <Images.FlagRu />,
    },
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
              onClick={() => {
                toggleAllDropDown();
                toggleCityDropdown();
              }}
              className="underline underline-offset-2 pr-2 cursor-pointer"
            >
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
                      }`}
                    >
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
              }`}
            >
              {/* Light Icon */}
              <div
                className={`absolute right-2 transition-opacity duration-300 ${
                  isDarkMode ? "opacity-0" : "opacity-100"
                }`}
              >
                <Images.LightModeIcon className="w-5 h-5 " />
              </div>
              {/* Dark Icon */}
              <div
                className={`absolute left-2 transition-opacity duration-300 ${
                  isDarkMode ? "opacity-100" : "opacity-0"
                }`}
              >
                <Images.DarkModeIcon className="w-5 h-5 text-white" />
              </div>
            </button>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                toggleAllDropDown();
                toggleDropdown();
              }}
            >
              {languages.find((lang) => lang.name === selectedLanguage)?.icon}
              <Images.arrowDown />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 top-7 w-[214px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
                      }`}
                    >
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
                  onClick={() => {
                    toggleAllDropDown();
                    toggleAddressDropdown();
                  }}
                >
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
                            }`}
                          >
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
                                setIsMicroDistrictDropdownOpen(false);
                              }}
                              className={`flex p-[12px] cursor-pointer ${
                                address.regionOrCityName === city.name
                                  ? "bg-[#1aa68383] text-white"
                                  : ""
                              }`}
                            >
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
                                }`}
                              >
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
                                }`}
                              >
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
                  onClick={() => {
                    toggleAllDropDown();
                    togglePriceDropdown();
                  }}
                  className="font-circular w-1/2 text-center border-r-2 text-[#252525] font-medium text-[16px] leading-5"
                >
                  Выберите цену
                </div>

                {isPriceDropdownOpen && (
                  <div
                    className="flex flex-col absolute top-[60px] left-0 w-[405px] bg-white border border-gray-200 rounded-[5px] shadow-lg p-4 space-y-[24px] text-[#252525] text-[14px] leading-[17.5px] font-normal"
                    style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
                  >
                    <h3 className="text-[#4B4B4B] text-left text-sm font-normal leading-7">
                      Выберите цену
                    </h3>

                    <div className="flex space-x-[15px] mb-6">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="text-[#4B4B4B] w-full border-[1px] border-[#D6D6D6] rounded-[5px] px-[10px] py-[9px] focus:outline-none focus:border-[#1aa683] text-sm font-normal leading-7 placeholder:text-[#D6D6D6] placeholder:font-normal placeholder:leading-7"
                        placeholder="Минимальный"
                      />

                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
                        className="text-[#4B4B4B] w-full border-[1px] border-[#D6D6D6] rounded-[5px] px-[10px] py-[9px] focus:outline-none focus:border-[#1aa683] text-sm font-normal leading-7 placeholder:text-[#D6D6D6] placeholder:font-normal placeholder:leading-7"
                        placeholder="Максимальный"
                      />
                    </div>

                    <div className="relative">
                      <div className="flex justify-between text-[#1AA683] text-left font-semibold text-[12px] leading-[17px]">
                        <span>0</span>
                        <span>500000</span>
                      </div>

                      <Slider
                        value={priceRange}
                        id="price-range-slider"
                        onChange={handleSliderChange}
                        className="w-full
                    [&_span.MuiSlider-thumb]:w-4 [&_span.MuiSlider-thumb]:h-4
                    [&_span.MuiSlider-thumb]:bg-[#1AA683] [&_span.MuiSlider-thumb]:rounded-[30px] [&_span.MuiSlider-thumb]:border-[2px] [&_span.MuiSlider-thumb]:border-white
                    [&_span.MuiSlider-track]:bg-[#1AA683] [&_span.MuiSlider-track]:border-none
                    [&_span.MuiSlider-rail]:bg-[#1AA683]"
                        valueLabelDisplay="auto"
                        min={0}
                        max={500000}
                        step={5000}
                      />
                    </div>
                  </div>
                )}

                <div
                  onClick={() => {
                    toggleAllDropDown();
                    toggleGenderDropdown();
                  }}
                  className="font-circular flex w-1/3 pl-4 border-r-2 text-[#252525] font-medium text-[16px] leading-5 cursor-pointer select-none"
                >
                  {gender || "Выберите пол"}
                </div>

                {isGenderDropdownOpen && (
                  <div
                    className="absolute top-[60px] left-0 px-[20px] pb-[12px] pt-[20px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left"
                    style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
                  >
                    <p className="text-[14px] font-normal leading-[17.5px] text-left text-[#252525]">
                      Выберите пол
                    </p>

                    <ul className="flex flex-col">
                      {genders.map((g) => (
                        <li
                          key={g.id}
                          onClick={() => {
                            setGender(g.name);
                            // setIsGenderDropdownOpen(false);
                          }}
                          className={`${
                            g.name === gender
                              ? "bg-[#D1EDE6] text-[#1AA683]"
                              : "bg-white text-[#252525]"
                          } w-full px-[12px] py-[4px] rounded-[5px] cursor-pointer font-normal text-[14px] leading-[17.5px]`}
                        >
                          {g.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div
                  onClick={() => {
                    toggleAllDropDown();
                    toggleHousematesDropdown();
                  }}
                  className="font-circular flex w-1/3 pl-4 text-[#252525] font-medium text-[16px] leading-5 cursor-pointer select-none"
                >
                  {housemates || "1 сожителей"}
                </div>

                {isHousematesDropdownOpen && (
                  <div className="absolute top-[70px] left-0 p-[20px] space-y-[24px] bg-white border border-gray-200 rounded-md shadow-lg text-[#252525]">
                    <div className="font-normal text-[14px] leading-[17.5px]">
                      Количество сожителей
                    </div>
                    <ul className="flex justify-between space-x-[7px]">
                      {housematesCount.map((room) => (
                        <li
                          key={room.id}
                          onClick={() => {
                            setHousemates(room.name);
                            setIsHousematesDropdownOpen(false);
                          }}
                          className={`${
                            housemates == room.name
                              ? "bg-[#1AA683] text-[#FFFFFF]"
                              : "bg-[#D1EDE6] text-[#5c5c5c]"
                          } flex items-center justify-center px-[12px] py-[4px] rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px] `}
                        >
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
              onClick={openModal}
            >
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
