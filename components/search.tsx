"use client";
import * as Images from "../public/images";

import Slider from "@mui/material/Slider";
import { useState } from "react";
import AddressDatas from "@/app/result.json";

const Search = () => {
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
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

  const [district, setDistrict] = useState({});
  const [microDistrcit, setMicroDistrcit] = useState({});

  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Toggle functions for opening and closing dropdowns
  const toggleAddressDropdown = () =>
    setIsAddressDropdownOpen(!isAddressDropdownOpen);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
  const toggleGenderDropdown = () =>
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  const toggleHousematesDropdown = () =>
    setIsHousematesDropdownOpen(!isHousematesDropdownOpen);

  const toggleAllDropDown = () => {
    setIsAddressDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsGenderDropdownOpen(false);
    setIsHousematesDropdownOpen(false);
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

  return (
    <div className="w-full mt-[40px] flex justify-center">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-between items-center">
        <div className="flex gap-[5px]">
          <div className="relative">
            <div
              className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                toggleAllDropDown();
                toggleAddressDropdown();
              }}>
              <div className="flex items-center gap-[12px]">
                <Images.Location w={"20"} h={"20"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  {city
                    ? city.length <= 17
                      ? city
                      : `${city?.substring(0, 15)}...`
                    : "Весь Казахстан"}
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>
            {isAddressDropdownOpen && (
              <div
                className="flex flex-col p-[16px] justify-between items-end absolute top-[60px] left-0 h-[514px] bg-white border border-gray-200 shadow-lg rounded-[5px]"
                style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
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
                          setDistrict({});
                          setMicroDistrcit({});
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
                            setMicroDistrcit({});
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
          </div>

          <div className="relative">
            <div
              className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                toggleAllDropDown();
                togglePriceDropdown();
              }}>
              <div className="flex items-center gap-[12px]">
                <Images.money w={"18"} h={"18"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  Выберите цену
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>
            {isPriceDropdownOpen && (
              <div
                className="flex flex-col absolute top-[60px] left-0 w-[405px] bg-white border border-gray-200 rounded-[5px] shadow-lg p-4 space-y-[24px] text-[#252525] text-[14px] leading-[17.5px] font-normal"
                style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
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
          </div>

          <div className="relative">
            <div
              className="w-[200px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                toggleAllDropDown();
                toggleGenderDropdown();
              }}>
              <div className="flex items-center gap-[12px]">
                <Images.user w={"18"} h={"18"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  {gender || "Выберите пол"}
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>

            {isGenderDropdownOpen && (
              <div
                className="absolute top-[60px] left-0 px-[20px] pb-[12px] pt-[20px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left"
                style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
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
          </div>

          <div className="relative">
            <div
              className="w-[230px] h-[50px] bg-white rounded-[5px] flex justify-between items-center px-[12px] cursor-pointer"
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
              onClick={() => {
                toggleAllDropDown();
                toggleHousematesDropdown();
              }}>
              <div className="flex items-center gap-[12px]">
                <Images.group w={"18"} h={"18"} />
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                  {housemates || "Количество сожителей"}
                </p>
              </div>
              <Images.arrowDown w={"18"} h={"18"} />
            </div>
            {isHousematesDropdownOpen && (
              <div className="absolute top-[60px] left-0 p-[20px] bg-white space-y-[24px] min-w-[230px] rounded-[5px] text-left">
                <p className="text-[14px] font-normal leading-[17.5px] text-left text-[#5c5c5c]">
                  Количество сожителей
                </p>

                <ul className="flex justify-between space-x-[7px]">
                  {housematesCount.map((room) => (
                    <li
                      key={room.id}
                      onClick={() => {
                        setHousemates(room.name);
                        // setIsHousematesDropdownOpen(false);
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
          </div>
        </div>

        <button
          className="w-[50px] h-[50px] flex items-center justify-center bg-[#32343A] rounded-[5px] cursor-pointer"
          style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}>
          <Images.search />
        </button>
      </form>
    </div>
  );
};

export default Search;
