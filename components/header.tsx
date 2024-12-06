"use client";
import React, { useState, useEffect } from "react";
import AddressDatas from "@/app/result.json";
import * as Images from "@/public/images";
import { useModal } from "@/app/context/modal-context";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  isFilterResults?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isFilterResults }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [housemates, setHousemates] = useState("");

  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isHousematesDropdownOpen, setIsHousematesDropdownOpen] =
    useState(false);

  const all_addresses = AddressDatas;

  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isMicroDistrictDropdownOpen, setIsMicroDistrictDropdownOpen] =
    useState(false);

  const [address, setAdress] = useState({
    regionOrCityName: "Весь Казахстан",
    districtName: "",
    microDistrictName: "",
  });

  const [district, setDistrict] = useState({ children: [] });
  const [microDistrcit, setMicroDistrcit] = useState({
    children: [],
  });

  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const toggleAddressDropdown = () =>
    setIsAddressDropdownOpen(!isAddressDropdownOpen);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
  const toggleGenderDropdown = () =>
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  const toggleHousematesDropdown = () =>
    setIsHousematesDropdownOpen(!isHousematesDropdownOpen);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      address: address,
      price: priceRange,
      gender,
      housemates,
    });
    // Implement your search logic or API call here
  };

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

  const toggleAllDropDown = () => {
    setIsDropdownOpen(false);
    setIsCityDropdownOpen(false);
    setIsAddressDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsGenderDropdownOpen(false);
    setIsHousematesDropdownOpen(false);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Рус");

  const languages = [
    { id: 1, name: "Рус" },
    { id: 2, name: "Қаз" },
  ];

  const [selectedCity, setSelectedCity] = useState("Астана");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const cities = [
    { id: 1, name: "Астана" },
    { id: 2, name: "Алматы" },
    { id: 3, name: "Шымкент" },
    { id: 4, name: "Орал" },
    { id: 5, name: "Қарағанды" },
  ];

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
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
              className="underline underline-offset-2 pr-2 cursor-pointer">
              <div className="flex items-center">
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#252525]">
                  {selectedCity
                    ? selectedCity.length <= 17
                      ? selectedCity
                      : `${selectedCity?.substring(0, 15)}...`
                    : "Весь Казахстан"}
                </p>
              </div>
            </a>
            {isCityDropdownOpen && (
              <div className="absolute top-6 left-3 w-[160px] h-[200px] bg-white border border-gray-200 rounded-md shadow-lg overflow-y-auto scrollbar">
                <ul className="py-2 flex flex-col gap-1">
                  {all_addresses.map((city) => (
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
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className={`px-[7px] py-[3px] rounded-[5px] text-[14px] font-normal leading-[18px] border ${
                    selectedLanguage === lang.name
                      ? "border-[#1aa68383] text-[#1aa68383]"
                      : "border-[#B5B7C0] text-[#B5B7C0"
                  }`}>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-row justify-between">
          <div className="flex items-center space-x-2">
            <Images.Logo className="w-[50px] h-[50px]" />
            <h1 className="font-circular font-semibold text-[28px] leading-[38px]">
              Şañyraq
            </h1>
          </div>
          {isAuth && isFilterResults && (
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center justify-around p-2 h-[60px] bg-white border border-gray-300 rounded-md shadow-md min-w-[700px]">
                <div
                  className="cursor-pointer flex w-[150px] pl-4 items-center border-r-2"
                  onClick={() => {
                    toggleAllDropDown();
                    toggleAddressDropdown();
                  }}>
                  <div className="flex items-center">
                    <p className="font-circular text-left text-[14px] font-medium leading-[18px] text-[#252525]">
                      {city
                        ? city.length <= 17
                          ? city
                          : `${city?.substring(0, 14)}...`
                        : "Весь Казахстан"}
                    </p>
                  </div>
                </div>
                {isAddressDropdownOpen && (
                  <div
                    className="flex flex-col p-[16px] justify-between items-end absolute top-[60px] left-[0] h-[514px] bg-white border border-gray-200 shadow-lg rounded-[5px]"
                    style={{
                      boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)",
                    }}
                    onBlur={() => setIsAddressDropdownOpen(false)}>
                    <div className="w-full p-[11px] flex items-center border-[1px] border-[#D6D6D6] rounded-[5px] text-[#B5B7C0] text-[14px] leading-[17.5px] ">
                      <input
                        className="w-full border-none outline-none "
                        type="text"
                        placeholder="Поиск по городу"
                      />
                      <Images.SearchIconGray />
                    </div>
                    <div className="w-full flex justify-between text-left text-[14px] gap-[7px]">
                      <div className="w-[214px] h-[380px] border-[1px] border-[#D6D6D6] rounded-[5px] overflow-y-auto scrollbar">
                        <ul className="flex flex-col gap-1 max-h-[380px] text-[#252525] ">
                          <li
                            onClick={() => {
                              setAdress((prevState) => ({
                                ...prevState,
                                regionOrCityName: "Весь Казахстан", // Defalut
                              }));
                              setIsDistrictDropdownOpen(false);
                              setDistrict({ children: [] });
                              setMicroDistrcit({ children: [] });
                              setCity("Весь Казахстан");
                            }}
                            className={`flex p-[12px] cursor-pointer ${
                              "Весь Казахстан" == address.regionOrCityName
                                ? "bg-[#1aa68383] text-white"
                                : ""
                            }`}>
                            Весь Казахстан
                          </li>
                          {all_addresses.map((region) => (
                            <li
                              key={region.id}
                              onClick={() => {
                                setAdress((prevState) => ({
                                  ...prevState,
                                  regionOrCityName: region.name,
                                }));
                                setDistrict(region);
                                setMicroDistrcit({ children: [] });
                                setIsDistrictDropdownOpen(true);
                                setCity(region.name);
                              }}
                              className={`flex p-[12px] cursor-pointer ${
                                address.regionOrCityName === region.name
                                  ? "bg-[#1aa68383] text-white"
                                  : ""
                              }`}>
                              {region.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {isDistrictDropdownOpen &&
                        district &&
                        district?.children &&
                        district.children.length > 0 && (
                          <div className="w-[214px] h-[380px] border-[1px] border-[#D6D6D6] text-[#252525] rounded-[5px] overflow-y-auto scrollbar">
                            {district.children.map((d: any) => (
                              <li
                                key={d.id}
                                onClick={() => {
                                  setAdress((prevState) => ({
                                    ...prevState,
                                    districtName: d.name,
                                  }));
                                  setMicroDistrcit(d);
                                  setIsMicroDistrictDropdownOpen(true);
                                  setCity(d.name);
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
                          <div className="w-[214px] h-[380px] border-[1px] border-[#D6D6D6] text-[#252525] rounded-[5px] overflow-y-auto scrollbar">
                            {microDistrcit.children.map((m: any) => (
                              <li
                                key={m.id}
                                onClick={() => {
                                  setAdress((prevState) => ({
                                    ...prevState,
                                    microDistrictName: m.name,
                                  }));
                                  setCity(m.name);
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

                <div
                  className="cursor-pointer flex w-[150px] pl-4 items-center border-r-2"
                  onClick={() => {
                    toggleAllDropDown();
                    togglePriceDropdown();
                  }}>
                  <div className="flex items-center">
                    <p className="font-circular text-left text-[14px] font-medium leading-[18px] text-[#252525]">
                      {priceRange[0] || priceRange[1] != 500000
                        ? `${priceRange[0]} - ${priceRange[1]}`
                        : "Выберите цену"}
                    </p>
                  </div>
                </div>
                {isPriceDropdownOpen && (
                  <div
                    className="flex flex-col absolute top-[60px] left-0 w-[405px] bg-white border border-gray-200 rounded-[5px] shadow-lg p-4 space-y-[24px] text-[#252525] text-[14px] leading-[17.5px] font-normal"
                    style={{
                      boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)",
                    }}>
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
                  className="cursor-pointer flex w-[150px] pl-4 items-center border-r-2"
                  onClick={() => {
                    toggleAllDropDown();
                    toggleGenderDropdown();
                  }}>
                  <div className="flex items-center">
                    <p className="font-circular text-left text-[14px] font-medium leading-[18px] text-[#252525]">
                      {gender || "Выберите пол"}
                    </p>
                  </div>
                </div>

                {isGenderDropdownOpen && (
                  <div
                    className="absolute top-[60px] left-0 px-[20px] pb-[12px] pt-[20px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left"
                    style={{
                      boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)",
                    }}>
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
                          } w-full px-[12px] py-[4px] rounded-[5px] cursor-pointer font-normal text-[14px] leading-[17.5px]`}>
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
                  className="font-circular flex w-1/5 pl-4 text-[#252525] font-medium text-[16px] leading-5 cursor-pointer select-none">
                  <div className="flex items-center">
                    <p className="font-circular text-left text-[14px] font-medium leading-[18px] text-[#252525]">
                      {/* {housemates + " жителей" || "Количество сожителей"} */}
                      {housemates
                        ? `${housemates} жителей`
                        : "Количество сожителей"}
                    </p>
                  </div>
                </div>
                {isHousematesDropdownOpen && (
                  <div className="absolute top-[60px] left-0 p-[20px] space-y-[24px] bg-white border border-gray-200 rounded-md shadow-lg text-[#252525]">
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
                          } flex items-center justify-center px-[12px] py-[4px] rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px] `}>
                          {room.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="flex justify-center items-center w-[30px] h-[30px] bg-[#1aa683] rounded"
                  onClick={handleSearchSubmit}>
                  <Images.SearchIcon className="w-[16px] h-[16px]" />
                </button>
              </div>
              <div></div>
            </div>
          )}
          <div className="font-circular flex flex-row justify-between space-x-[8px]">
            {!isAuth && (
              <button
                className="flex justify-center items-center space-x-2 text-[#1aa683] font-bold px-[25px] h-[50px] rounded"
                onClick={() => router.push("/login")}>
                <span>Войти</span>
              </button>
            )}
            <button
              className="flex justify-center items-center space-x-2 bg-[#1aa683] text-white font-bold px-[25px] h-[50px] rounded"
              onClick={openModal}>
              <span>Подать объявление</span>
              <Images.ArrowRight />
            </button>
            {isAuth && (
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
