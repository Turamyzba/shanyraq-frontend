"use client";
import { useEffect, useState } from "react";
import ALL_ADDRESSES from "@/app/result.json";
import Slider from "@mui/material/Slider";
import * as Images from "@/public/images"; // Import images
import ToggleButton from "@/components/toggle";

const Filter = ({ onSubmit, initialQuery }) => {
  const [selectedGender, setSelectedGender] = useState(
    initialQuery?.selectedGender || "Любой"
  ); // Store selected gender
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false); // Manage dropdown visibility

  const [region, setRegion] = useState(initialQuery?.region || "");
  const [district, setDistrict] = useState(initialQuery?.district || "");
  const [microDistrict, setMicroDistrict] = useState(
    initialQuery?.microDistrict || ""
  );

  const [regionsData, setRegionsData] = useState([]); // Fetch or import region data
  const [districtsData, setDistrictsData] = useState([]); // Fetch or import district data
  const [microDistrictsData, setMicroDistrictsData] = useState([]); // Fetch or import microdistrict data

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isMicroDistrictDropdownOpen, setIsMicroDistrictDropdownOpen] =
    useState(false);

  const [zhk, setZhk] = useState("");

  const [priceRange, setPriceRange] = useState(
    initialQuery ? [initialQuery.minPrice, initialQuery.maxPrice] : [0, 500000]
  );
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]); // Update price range when slider is changed
  };

  const [housemates, setHousemates] = useState(
    initialQuery?.numberOfPeopleAreYouAccommodating?.toString() || "1"
  );
  const housematesCount = ["1", "2", "3", "4", "5+"];

  const [roommates, setRoommates] = useState(
    initialQuery?.quantityOfRooms || 1
  );

  const [ageRange, setAgeRange] = useState(
    initialQuery ? [initialQuery.minAge, initialQuery.maxAge] : [18, 50]
  );
  const handleAgeRangeChange = (event: any, newValue: number | number[]) => {
    setAgeRange(newValue as [number, number]);
  };

  const [longTerm, setLongTerm] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch regions data
    const fetchedRegions = ALL_ADDRESSES;
    setRegionsData(fetchedRegions);

    // If initialQuery is provided and region/district/microdistrict are set,
    // pre-load the dependent dropdowns
    if (initialQuery?.region) {
      const selectedRegion = fetchedRegions.find(
        (r: any) => r.name === initialQuery.region
      );
      setDistrictsData(selectedRegion ? selectedRegion.children : []);

      if (initialQuery?.district) {
        const selectedDistrict = selectedRegion?.children?.find(
          (d: any) => d.name === initialQuery.district
        );
        setMicroDistrictsData(
          selectedDistrict ? selectedDistrict.children : []
        );
      }
    }
  }, [initialQuery]);

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

  const genderOptions = ["Мужчина", "Женщина", "Любой"]; // Gender options

  // Function to handle gender selection
  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setIsGenderDropdownOpen(false); // Close the dropdown after selection
  };

  // Function to toggle the dropdown visibility
  const toggleGenderDropdown = () => {
    setIsGenderDropdownOpen((prev) => !prev);
  };
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "";
    }
    return parsedDate.toISOString().split("T")[0]; // Formats as "YYYY-MM-DD"
  };

  const [moveInDate, setMoveInDate] = useState<string>(
    initialQuery?.arriveDate || ""
  );
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoveInDate(e.target.value);
  };

  const [isToday, setIsToday] = useState(false);
  const [isTomorrow, setIsTomorrow] = useState(false);

  const handleCheckboxChange = (
    type: "today" | "tomorrow" | "notFirstFloor" | "notLastFloor"
  ) => {
    if (type === "today") {
      setIsToday(!isToday);
      setIsTomorrow(false);
      setMoveInDate(!isToday ? formatDate(new Date().toISOString()) : "");
    } else if (type === "tomorrow") {
      setIsTomorrow(!isTomorrow);
      setIsToday(false);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setMoveInDate(!isTomorrow ? formatDate(tomorrow.toISOString()) : "");
    } else if (type === "notFirstFloor") {
      setIsNotFirstFloor(!isNotFirstFloor);
    } else if (type === "notLastFloor") {
      setIsNotLastFloor(!isNotLastFloor);
    }
  };

  const [roomSize, setRoomSize] = useState([
    initialQuery?.minArea?.toString() || "",
    initialQuery?.maxArea?.toString() || "",
  ]);

  const handleRoomSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newRoomSize = [...roomSize];
    newRoomSize[index] = e.target.value;
    setRoomSize(newRoomSize);
  };

  const [floors, setFloors] = useState(["", ""]);
  const [isNotFirstFloor, setIsNotFirstFloor] = useState(
    initialQuery?.notTheFirstFloor || false
  );
  const [isNotLastFloor, setIsNotLastFloor] = useState(
    initialQuery?.notTheTopFloor || false
  );

  const handleFloorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFloor = [...floors];
    newFloor[index] = e.target.value;
    setFloors(newFloor);
  };

  const [petsAllowed, setPetsAllowed] = useState(
    initialQuery?.arePetsAllowed || false
  );
  const [utilitiesIncluded, setUtilitiesIncluded] = useState(
    initialQuery?.isCommunalServiceIncluded || false
  );
  const [forStudents, setForStudents] = useState(
    initialQuery?.intendedForStudents || false
  );
  const [badHabitsAllowed, setBadHabitsAllowed] = useState(false);

  const [propertyType, setPropertyType] = useState(
    initialQuery?.typeOfHousing || ""
  );

  const [moreFilters, setMoreFilters] = useState(false);

  const handleSubmit = () => {
    const queryObject = {
      selectedGender: selectedGender, // "string"
      region: region, // "string"
      district: district, // "string"
      microDistrict: microDistrict, // "string"
      minPrice: priceRange[0], // number
      maxPrice: priceRange[1], // number
      numberOfPeopleAreYouAccommodating: housemates, // number
      quantityOfRooms: roommates, // "string"
      minAge: ageRange[0], // number
      maxAge: ageRange[1], // number
      arriveDate: moveInDate || "", // "YYYY-MM-DD"
      minArea: roomSize[0] ? parseInt(roomSize[0]) : 0, // number
      maxArea: roomSize[1] ? parseInt(roomSize[1]) : 0, // number
      notTheFirstFloor: isNotFirstFloor, // boolean
      notTheTopFloor: isNotLastFloor, // boolean
      arePetsAllowed: petsAllowed, // boolean
      isCommunalServiceIncluded: utilitiesIncluded, // boolean
      intendedForStudents: forStudents, // boolean
      typeOfHousing: propertyType || "", // "string"
    };

    onSubmit(queryObject);
  };

  const saveFilter = () => {
    // Construct the query object same as handleSubmit
    const queryObject = {
      selectedGender: selectedGender,
      region: region,
      district: district,
      microDistrict: microDistrict,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      numberOfPeopleAreYouAccommodating: parseInt(housemates),
      quantityOfRooms: roommates,
      minAge: ageRange[0],
      maxAge: ageRange[1],
      arriveDate: moveInDate || "",
      minArea: roomSize[0] ? parseInt(roomSize[0]) : 0,
      maxArea: roomSize[1] ? parseInt(roomSize[1]) : 0,
      notTheFirstFloor: isNotFirstFloor,
      notTheTopFloor: isNotLastFloor,
      arePetsAllowed: petsAllowed,
      isCommunalServiceIncluded: utilitiesIncluded,
      intendedForStudents: forStudents,
      typeOfHousing: propertyType || "",
    };

    // Check if already saved
    if (sessionStorage.getItem("savedFilter")) {
      alert(
        "Фильтр уже был сохранен ранее. Перезагрузите страницу или очистите, чтобы сохранить заново."
      );
      return;
    }

    sessionStorage.setItem("savedFilter", JSON.stringify(queryObject));
    alert("Поиск сохранен!");
  };

  return (
    <aside
      className="filter min-w-[450px] bg-white rounded-[10px] border-red-300 border overflow-y-auto scrollbar max-h-[90vh] sticky top-[30px]"
      style={{
        boxShadow: "0px 4px 9px 0px #98A0B440",
      }}>
      <div className="py-[32px] pl-[16px] pr-[34px] flex flex-col w-full ">
        <div className="flex items-center justify-between w-full">
          <p className="text-[24px] font-semibold leading-[30px] text-[#252525]">
            Фильтр
          </p>
          <button
            // href="#"
            className="font-circular text-[14px] px-[6px] py-[4px] text-[#1AA683] font-normal leading-[17px] hover:underline outline-none">
            Сбросить все
          </button>
        </div>

        <div className="mt-[32px] w-full flex flex-col gap-[30px]">
          {/* Gender */}
          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Гендер
            </p>

            <div className="relative">
              <div
                className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                  !isGenderDropdownOpen
                    ? "border-[#EBEBEB]"
                    : "border-[#1AA683]"
                }`}
                onClick={toggleGenderDropdown}>
                <div className="flex items-center gap-[12px]">
                  <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0] ">
                    {selectedGender || "Выберите пол"}
                  </p>
                </div>
                {isGenderDropdownOpen ? (
                  <Images.arrowUp w={"20"} h={"20"} color={"#1AA683"} />
                ) : (
                  <Images.arrowDown w={"20"} h={"20"} color={"#B5B7C0"} />
                )}
              </div>
              {isGenderDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-[5px] overflow-y-auto mt-1 text-left text-[14px] font-normal leading-[18px]">
                  {genderOptions.map((gender, index) => (
                    <div
                      key={index}
                      onClick={() => handleGenderSelect(gender)} // Set selected gender
                      className={`${
                        selectedGender === gender
                          ? "bg-[#1AA683] text-[#FFFFFF]"
                          : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                      } p-[10px] cursor-pointer `}
                      //   className=" hover:bg-[#1AA683] hover:text-white"
                    >
                      {gender}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Region */}
          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Регион
            </p>
            <div className="relative">
              <div
                className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                  !isRegionDropdownOpen
                    ? "border-[#EBEBEB]"
                    : "border-[#1AA683]"
                }`}
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}>
                <div className="flex items-center gap-[12px]">
                  <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                    {region || "Выберите регион"}
                  </p>
                </div>
                {isRegionDropdownOpen ? (
                  <Images.arrowUp w={"20"} h={"20"} color={"#1AA683"} />
                ) : (
                  <Images.arrowDown w={"20"} h={"20"} color={"#B5B7C0"} />
                )}
              </div>
              {isRegionDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-[5px] overflow-y-auto mt-1 text-left text-[14px] font-normal leading-[18px]">
                  <div
                    onClick={() => {
                      setRegion("Весь Казахстан");
                      setDistrict("");
                      setMicroDistrict("");
                      setIsRegionDropdownOpen(false);
                      setDistrictsData([]);
                    }}
                    className={`${
                      region === "Весь Казахстан"
                        ? "bg-[#1AA683] text-[#FFFFFF]"
                        : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                    } p-[10px] cursor-pointer `}>
                    Весь Казахстан
                  </div>
                  {regionsData.map((regionData: any) => (
                    <div
                      key={regionData.name}
                      onClick={() => handleRegionSelect(regionData.name)}
                      className={`${
                        region === regionData.name
                          ? "bg-[#1AA683] text-[#FFFFFF]"
                          : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                      } p-[10px] cursor-pointer `}
                      //   className="p-[10px] cursor-pointer hover:bg-[#1AA683] hover:text-white"
                    >
                      {regionData.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* District */}
          {region && region !== "Весь Казахстан" && (
            <div className="flex flex-col w-full gap-[24px]">
              <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                Район
              </p>
              <div className="relative">
                <div
                  className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                    !isDistrictDropdownOpen
                      ? "border-[#EBEBEB]"
                      : "border-[#1AA683]"
                  }`}
                  onClick={() =>
                    setIsDistrictDropdownOpen(!isDistrictDropdownOpen)
                  }>
                  <div className="flex items-center gap-[12px]">
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                      {district || "Выберите район"}
                    </p>
                  </div>
                  {isDistrictDropdownOpen ? (
                    <Images.arrowUp w={"20"} h={"20"} color={"#1AA683"} />
                  ) : (
                    <Images.arrowDown w={"20"} h={"20"} color={"#B5B7C0"} />
                  )}
                </div>
                {isDistrictDropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-[5px] overflow-y-auto mt-1 text-left text-[14px] font-normal leading-[18px]">
                    {districtsData.map((districtData: any) => (
                      <div
                        key={districtData.name}
                        onClick={() => handleDistrictSelect(districtData.name)}
                        className={`${
                          district === districtData.name
                            ? "bg-[#1AA683] text-[#FFFFFF]"
                            : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                        } p-[10px] cursor-pointer `}>
                        {districtData.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Microdistrict */}
          {district && microDistrictsData.length > 0 && (
            <div className="flex flex-col w-full gap-[24px]">
              <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                Микрорайон
              </p>
              <div className="relative">
                <div
                  className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                    !isMicroDistrictDropdownOpen
                      ? "border-[#EBEBEB]"
                      : "border-[#1AA683]"
                  }`}
                  onClick={() =>
                    setIsMicroDistrictDropdownOpen(!isMicroDistrictDropdownOpen)
                  }>
                  <div className="flex items-center gap-[12px]">
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                      {microDistrict || "Выберите микрорайон"}
                    </p>
                  </div>
                  {isMicroDistrictDropdownOpen ? (
                    <Images.arrowUp w={"20"} h={"20"} color={"#1AA683"} />
                  ) : (
                    <Images.arrowDown w={"20"} h={"20"} color={"#B5B7C0"} />
                  )}
                </div>
                {isMicroDistrictDropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-[5px] overflow-y-auto mt-1 text-left text-[14px] font-normal leading-[18px]">
                    {microDistrictsData.map((microDistrictData: any) => (
                      <div
                        key={microDistrictData.name}
                        onClick={() =>
                          handleMicroDistrictSelect(microDistrictData.name)
                        }
                        className={`${
                          microDistrict === microDistrictData.name
                            ? "bg-[#1AA683] text-[#FFFFFF]"
                            : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                        } p-[10px] cursor-pointer `}>
                        {microDistrictData.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ZHK */}
          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Жилой комплекс
            </p>

            <div className="relative">
              <input
                type="text"
                value={zhk} // Use zhk state
                onChange={(e) => setZhk(e.target.value)} // Update zhk state
                placeholder="Введите жилой комплекс"
                className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Выберите цену
            </p>

            <div className="flex space-x-[15px]">
              <input
                type="number"
                value={priceRange[0]}
                onChange={
                  (e) => setPriceRange([+e.target.value, priceRange[1]]) // Update min price
                }
                className="w-full focus:text-[#252525] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
                placeholder="Минимальный"
              />

              <input
                type="number"
                value={priceRange[1]}
                onChange={
                  (e) => setPriceRange([priceRange[0], +e.target.value]) // Update max price
                }
                className="w-full focus:text-[#252525] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
                placeholder="Максимальный"
              />
            </div>

            {/* Price Range Slider */}
            <div className="relative">
              <div className="flex justify-between text-[#1AA683] text-left font-semibold text-[12px] leading-[17px]">
                <span>0</span>
                <span>500000</span>
              </div>

              <Slider
                value={priceRange}
                onChange={handleSliderChange}
                className="w-full [&_span.MuiSlider-thumb]:w-4 [&_span.MuiSlider-thumb]:h-4 [&_span.MuiSlider-thumb]:bg-[#1AA683] [&_span.MuiSlider-thumb]:rounded-[30px] [&_span.MuiSlider-thumb]:border-[2px] [&_span.MuiSlider-thumb]:border-white
                    [&_span.MuiSlider-track]:bg-[#1AA683] [&_span.MuiSlider-track]:border-none
                    [&_span.MuiSlider-rail]:bg-[#1AA683]"
                valueLabelDisplay="auto"
                min={0}
                max={500000}
                step={5000}
              />
            </div>
          </div>

          {/* Housemates */}
          <div className="flex flex-col gap-[24px] w-full">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Количество сожителей
            </p>

            <ul className="flex gap-[20px]">
              {housematesCount.map((room) => (
                <li
                  key={room}
                  onClick={() => setHousemates(room)} // Set the selected housemates count
                  className={`${
                    housemates === room
                      ? "bg-[#1AA683] text-[#FFFFFF]"
                      : "bg-[#D1EDE6] text-[#5c5c5c]"
                  } h-[34px] w-[48px] flex items-center justify-center rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px]`}>
                  {room}
                </li>
              ))}
            </ul>
          </div>

          {/* Rooms */}
          <div className="flex flex-col gap-[20px] w-full">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Количество комнат
            </p>

            <div className="flex items-center justify-around w-[100px] h-[40px] border rounded-lg text-[20px] border-gray-300">
              <button
                onClick={() =>
                  setRoommates((prev: any) => Math.max(prev - 1, 1))
                }
                className="">
                <Images.minus w={"16"} h={"16"} />
              </button>

              <span className="text-[14px] font-normal text-center text-[#252525]">
                {roommates}
              </span>

              <button
                onClick={() =>
                  setRoommates((prev: any) => Math.min(prev + 1, 10))
                }
                className="">
                <Images.plus w={"16"} h={"16"} />
              </button>
            </div>
          </div>

          {/* Age */}
          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Возраст
            </p>

            <div className="relative">
              <div className="flex justify-between text-[#1AA683] text-left font-semibold text-[12px] leading-[17px]">
                <span>0</span>
                <span>50</span>
              </div>

              <Slider
                value={ageRange}
                className="w-full [&_span.MuiSlider-thumb]:w-4 [&_span.MuiSlider-thumb]:h-4 [&_span.MuiSlider-thumb]:bg-[#1AA683] [&_span.MuiSlider-thumb]:rounded-[30px] [&_span.MuiSlider-thumb]:border-[2px] [&_span.MuiSlider-thumb]:border-white
                    [&_span.MuiSlider-track]:bg-[#1AA683] [&_span.MuiSlider-track]:border-none
                    [&_span.MuiSlider-rail]:bg-[#1AA683]"
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} лет`}
                min={18}
                max={50}
                step={1}
              />
            </div>
          </div>

          {/* Long/Short Term */}
          <div className="flex flex-col gap-[24px] w-full">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Продолжительность
            </p>
            <div className="flex gap-[16px]">
              {/* Long Term */}
              <div
                onClick={() => setLongTerm(true)}
                className={`${
                  longTerm === true
                    ? "bg-[#1AA683] text-[#FFFFFF]"
                    : "bg-[#D1EDE6] text-[#5c5c5c]"
                } flex items-center justify-center h-[40px] w-[150px] rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px]`}>
                Долгосрочно
              </div>

              {/* Short Term */}
              <div
                onClick={() => setLongTerm(false)}
                className={`${
                  longTerm === false
                    ? "bg-[#1AA683] text-[#FFFFFF]"
                    : "bg-[#D1EDE6] text-[#5c5c5c]"
                } flex items-center justify-center  h-[40px] w-[150px] rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px]`}>
                Краткосрочно
              </div>
            </div>
          </div>

          {/* Move-in Date */}
          <div className="flex flex-col w-full gap-[24px]">
            <div className="text-[#252525] flex items-center gap-[20px] font-normal text-[14px] leading-[17.5px] text-left">
              Дата начала заселения
              <div className="flex gap-[16px]">
                {/* Today */}
                <label
                  htmlFor="today"
                  className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="today"
                    checked={isToday}
                    onChange={() => handleCheckboxChange("today")}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                      isToday ? "border-[#1AA683]" : "border-gray-300"
                    }`}>
                    {isToday && <Images.check />}
                  </div>
                  Сегодня
                </label>

                {/* Tomorrow */}
                <label
                  htmlFor="tomorrow"
                  className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="tomorrow"
                    checked={isTomorrow}
                    onChange={() => handleCheckboxChange("tomorrow")}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                      isTomorrow ? "border-[#1AA683]" : "border-gray-300"
                    }`}>
                    {isTomorrow && <Images.check />}
                  </div>
                  Завтра
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="date"
                value={moveInDate}
                onChange={handleDateChange}
                className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
              />
            </div>
          </div>

          {moreFilters && (
            <>
              {/* Room Size */}
              <div className="flex flex-col w-full gap-[24px]">
                <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                  Площадь комнат
                </p>

                <div className="flex gap-[10px]">
                  <input
                    type="number"
                    value={roomSize[0]}
                    onChange={(e) => handleRoomSizeChange(e, 0)}
                    placeholder="От"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
                  />
                  <input
                    type="number"
                    value={roomSize[1]}
                    onChange={(e) => handleRoomSizeChange(e, 1)}
                    placeholder="До"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
                  />
                </div>
              </div>

              {/* Floor */}
              <div className="flex flex-col w-full gap-[24px]">
                <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                  Этаж
                </p>

                <div className="flex gap-[10px]">
                  <input
                    type="number"
                    value={floors[0]}
                    onChange={(e) => handleFloorChange(e, 0)}
                    placeholder="От"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
                  />
                  <input
                    type="number"
                    value={floors[1]}
                    onChange={(e) => handleFloorChange(e, 1)}
                    placeholder="До"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1aa683] text-[#B5B7C0]"
                  />
                </div>

                <div className="flex gap-[16px]">
                  {/* Не первый этаж */}
                  <label
                    htmlFor="notFirstFloor"
                    className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="notFirstFloor"
                      checked={isNotFirstFloor}
                      onChange={() => handleCheckboxChange("notFirstFloor")}
                      className="hidden"
                    />
                    <div
                      className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                        isNotFirstFloor ? "border-[#1AA683]" : "border-gray-300"
                      }`}>
                      {isNotFirstFloor && <Images.check />}
                    </div>
                    Не первый этаж?
                  </label>

                  {/* Не последний этаж */}
                  <label
                    htmlFor="notLastFloor"
                    className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="notLastFloor"
                      checked={isNotLastFloor}
                      onChange={() => handleCheckboxChange("notLastFloor")}
                      className="hidden"
                    />
                    <div
                      className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                        isNotLastFloor ? "border-[#1AA683]" : "border-gray-300"
                      }`}>
                      {isNotLastFloor && <Images.check />}
                    </div>
                    Не последний этаж?
                  </label>
                </div>
              </div>

              {/* Pets Allowed */}
              <ToggleButton
                label="Разрешено ли с животными?"
                value={petsAllowed}
                onChange={setPetsAllowed}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              {/* Utilities Included */}
              <ToggleButton
                label="Включены ли коммунальные услуги?"
                value={utilitiesIncluded}
                onChange={setUtilitiesIncluded}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              {/* For Students */}
              <ToggleButton
                label="Можно ли студентам?"
                value={forStudents}
                onChange={setForStudents}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              {/* Bad Habits Allowed */}
              <ToggleButton
                label="Можно ли с вредными привычками?"
                value={badHabitsAllowed}
                onChange={setBadHabitsAllowed}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              {/* Property Type */}
              <div className="flex flex-col w-full gap-[24px]">
                <div className="w-full text-[#252525] flex items-center gap-[20px] font-normal text-[14px] leading-[17.5px] text-left">
                  Тип жилья?
                  <div className="ml-[100px] flex gap-[16px]">
                    <label
                      htmlFor="propertyTypeApartment"
                      className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="propertyTypeApartment"
                        checked={propertyType === "Квартира"}
                        onChange={() => setPropertyType("Квартира")}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
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
                      className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="propertyTypeHouse"
                        checked={propertyType === "Дом"}
                        onChange={() => setPropertyType("Дом")}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                          propertyType === "Дом"
                            ? "border-[#1AA683]"
                            : "border-gray-300"
                        }`}>
                        {propertyType === "Дом" && <Images.check />}
                      </div>
                      Дом
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-[4px] items-center mt-[30px]">
          <button
            onClick={() => setMoreFilters(!moreFilters)}
            className="w-1/2 flex items-center justify-center gap-[10px] py-[10px] text-[14px] font-semibold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
            <span>{moreFilters ? "Уменьшить фильтр" : "Подробный фильтр"}</span>
            <Images.filter />
          </button>
          <button
            onClick={saveFilter}
            className="w-1/2 flex items-center justify-center gap-[10px] py-[10px] text-[14px] font-semibold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100">
            <span>Сохранить поиск</span>
            <Images.search color="black" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className={`mt-[24px] py-[15px] text-[16px] font-semibold leading-[20px] tracking-[0.2px] rounded-[5px] bg-[#32343A] text-[#FFFFFF]`}>
          Найти
        </button>
      </div>
    </aside>
  );
};

export default Filter;
