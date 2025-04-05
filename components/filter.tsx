"use client";
import { useEffect, useState } from "react";
import ALL_ADDRESSES from "@/app/result.json";
import Slider from "@mui/material/Slider";
import * as Images from "@/public/images";
import ToggleButton from "@/components/toggle";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    updateMatches();
    media.addEventListener("change", updateMatches);
    return () => {
      media.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}
const Filter = ({ onSubmit, initialQuery }) => {
  const [selectedGender, setSelectedGender] = useState(
    initialQuery?.selectedGender || "Any"
  );
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const [region, setRegion] = useState(initialQuery?.region || "");
  const [district, setDistrict] = useState(initialQuery?.district || "");
  const [microDistrict, setMicroDistrict] = useState(
    initialQuery?.microDistrict || ""
  );

  const [regionsData, setRegionsData] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);
  const [microDistrictsData, setMicroDistrictsData] = useState([]);

  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [isMicroDistrictDropdownOpen, setIsMicroDistrictDropdownOpen] =
    useState(false);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isOpen, setOpen] = useState(true);

  const [zhk, setZhk] = useState("");

  const [priceRange, setPriceRange] = useState(
    initialQuery ? [initialQuery.minPrice, initialQuery.maxPrice] : [0, 500000]
  );
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
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

  const [longTerm, setLongTerm] = useState<boolean>(false);

  useEffect(() => {
    const fetchedRegions = ALL_ADDRESSES;
    setRegionsData(fetchedRegions);

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
    setDistrict("");
    setMicroDistrict("");
    setIsRegionDropdownOpen(false);

    const selectedRegion = regionsData.find((r: any) => r.name === regionName);
    setDistrictsData(selectedRegion ? selectedRegion.children : []);
  };

  const handleDistrictSelect = (districtName: string) => {
    setDistrict(districtName);
    setMicroDistrict("");
    setIsDistrictDropdownOpen(false);

    const selectedDistrict = districtsData.find(
      (d: any) => d.name === districtName
    );
    setMicroDistrictsData(selectedDistrict ? selectedDistrict.children : []);
  };

  const handleMicroDistrictSelect = (microDistrictName: string) => {
    setMicroDistrict(microDistrictName);
    setIsMicroDistrictDropdownOpen(false);
  };

  const genderOptions = ["Male", "Female", "Any"];

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setIsGenderDropdownOpen(false);
  };

  const toggleGenderDropdown = () => {
    setIsGenderDropdownOpen((prev) => !prev);
  };
  const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "";
    }
    return parsedDate.toISOString().split("T")[0];
  };

  const [moveInDate, setMoveInDate] = useState<string>(
    initialQuery?.arriveDate ? formatDate(initialQuery.arriveDate) : ""
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoveInDate(formatDate(e.target.value));
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
    initialQuery?.maxArea?.toString() || "500",
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
      arriveData: moveInDate || "",
      minArea: roomSize[0] ? parseInt(roomSize[0]) : 0,
      maxArea: roomSize[1] ? parseInt(roomSize[1]) : 500,
      notTheFirstFloor: isNotFirstFloor,
      notTheTopFloor: isNotLastFloor,
      forALongTime: longTerm,
      arePetsAllowed: petsAllowed,
      isCommunalServiceIncluded: utilitiesIncluded,
      intendedForStudents: forStudents,
      typeOfHousing: propertyType || "",
    };

    onSubmit(queryObject);
  };

  const saveFilter = () => {
    const queryObject = {
      selectedGender: selectedGender,
      region: region,
      district: district,
      microDistrict: microDistrict,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      numberOfPeopleAreYouAccommodating: housemates,
      quantityOfRooms: roommates,
      minAge: ageRange[0],
      maxAge: ageRange[1],
      arriveData: moveInDate || "",
      minArea: roomSize[0] ? parseInt(roomSize[0]) : 0,
      maxArea: roomSize[1] ? parseInt(roomSize[1]) : 0,
      notTheFirstFloor: isNotFirstFloor,
      notTheTopFloor: isNotLastFloor,
      forALongTime: longTerm,
      arePetsAllowed: petsAllowed,
      isCommunalServiceIncluded: utilitiesIncluded,
      intendedForStudents: forStudents,
      typeOfHousing: propertyType || "",
    };

    if (sessionStorage.getItem("savedFilter")) {
      alert(
        "Filter has already been saved. Reload the page or clear to save again."
      );
      return;
    }

    sessionStorage.setItem("savedFilter", JSON.stringify(queryObject));
    alert("Search saved!");
  };

  return (
    <div
      className="filter w-full md:min-w-[250px] lg:min-w-[250px] xl:min-w-[350px]  w-full bg-white  overflow-y-auto scrollbar max-h-[90vh] sticky top-[30px]"
      style={{
        boxShadow: "0px 4px 9px 0px #98A0B440",
      }}
    >
      <div className="py-[32px] px-5 flex flex-col w-full ">
        <div className="flex items-center justify-between w-full">
          <div className={isMobile ? "w-full flex justify-center" : ""}>
            <p className="text-[24px] font-semibold leading-[30px] text-[#252525]">
              Filter
            </p>
          </div>
          <div className={isMobile ? "hidden" : ""}>
            <button className="font-circular text-[14px] px-[6px] py-[4px] text-[#1132F5] font-normal leading-[17px] hover:underline outline-none">
              Reset all
            </button>
          </div>
        </div>

        <div className="mt-[32px] w-full flex flex-col gap-[30px] ">
          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Gender
            </p>

            <div className="relative">
              <div
                className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                  !isGenderDropdownOpen
                    ? "border-[#EBEBEB]"
                    : "border-[#1132F5]"
                }`}
                onClick={toggleGenderDropdown}
              >
                <div className="flex items-center gap-[12px]">
                  <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0] ">
                    {selectedGender || "Select gender"}
                  </p>
                </div>
                {isGenderDropdownOpen ? (
                  <Images.arrowUp w={"20"} h={"20"} color={"#1132F5"} />
                ) : (
                  <Images.arrowDown w={"20"} h={"20"} color={"#B5B7C0"} />
                )}
              </div>
              {isGenderDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-[5px] overflow-y-auto mt-1 text-left text-[14px] font-normal leading-[18px]">
                  {genderOptions.map((gender, index) => (
                    <div
                      key={index}
                      onClick={() => handleGenderSelect(gender)}
                      className={`${
                        selectedGender === gender
                          ? "bg-[#1132F5] text-[#FFFFFF]"
                          : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                      } p-[10px] cursor-pointer `}
                    >
                      {gender}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Region
            </p>
            <div className="relative">
              <div
                className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                  !isRegionDropdownOpen
                    ? "border-[#EBEBEB]"
                    : "border-[#1132F5]"
                }`}
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
              >
                <div className="flex items-center gap-[12px]">
                  <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                    {region || "Select region"}
                  </p>
                </div>
                {isRegionDropdownOpen ? (
                  <Images.arrowUp w={"20"} h={"20"} color={"#1132F5"} />
                ) : (
                  <Images.arrowDown w={"20"} h={"20"} color={"#B5B7C0"} />
                )}
              </div>
              {isRegionDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-[5px] overflow-y-auto mt-1 text-left text-[14px] font-normal leading-[18px]">
                  <div
                    onClick={() => {
                      setRegion("All Kazakhstan");
                      setDistrict("");
                      setMicroDistrict("");
                      setIsRegionDropdownOpen(false);
                      setDistrictsData([]);
                    }}
                    className={`${
                      region === "All Kazakhstan"
                        ? "bg-[#1132F5] text-[#FFFFFF]"
                        : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                    } p-[10px] cursor-pointer `}
                  >
                    All Kazakhstan
                  </div>
                  {regionsData.map((regionData: any) => (
                    <div
                      key={regionData.name}
                      onClick={() => handleRegionSelect(regionData.name)}
                      className={`${
                        region === regionData.name
                          ? "bg-[#1132F5] text-[#FFFFFF]"
                          : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                      } p-[10px] cursor-pointer `}
                    >
                      {regionData.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {region && region !== "All Kazakhstan" && (
            <div className="flex flex-col w-full gap-[24px]">
              <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                District
              </p>
              <div className="relative">
                <div
                  className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                    !isDistrictDropdownOpen
                      ? "border-[#EBEBEB]"
                      : "border-[#1132F5]"
                  }`}
                  onClick={() =>
                    setIsDistrictDropdownOpen(!isDistrictDropdownOpen)
                  }
                >
                  <div className="flex items-center gap-[12px]">
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                      {district || "Select district"}
                    </p>
                  </div>
                  {isDistrictDropdownOpen ? (
                    <Images.arrowUp w={"20"} h={"20"} color={"#1132F5"} />
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
                            ? "bg-[#1132F5] text-[#FFFFFF]"
                            : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                        } p-[10px] cursor-pointer `}
                      >
                        {districtData.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {district && microDistrictsData.length > 0 && (
            <div className="flex flex-col w-full gap-[24px]">
              <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                Microdistrict
              </p>
              <div className="relative">
                <div
                  className={`w-full py-[10px] bg-white rounded-[5px] border-[1px] flex justify-between items-center px-[10px] cursor-pointer ${
                    !isMicroDistrictDropdownOpen
                      ? "border-[#EBEBEB]"
                      : "border-[#1132F5]"
                  }`}
                  onClick={() =>
                    setIsMicroDistrictDropdownOpen(!isMicroDistrictDropdownOpen)
                  }
                >
                  <div className="flex items-center gap-[12px]">
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#B5B7C0]">
                      {microDistrict || "Select microdistrict"}
                    </p>
                  </div>
                  {isMicroDistrictDropdownOpen ? (
                    <Images.arrowUp w={"20"} h={"20"} color={"#1132F5"} />
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
                            ? "bg-[#1132F5] text-[#FFFFFF]"
                            : "hover:bg-[#D1EDE6] hover:text-[#5c5c5c]"
                        } p-[10px] cursor-pointer `}
                      >
                        {microDistrictData.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Select price
            </p>

            <div className="flex space-x-[15px]">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                className="w-full focus:text-[#252525] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
                placeholder="Minimum"
              />

              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
                className="w-full focus:text-[#252525] border-[1px] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
                placeholder="Maximum"
              />
            </div>

            <div className="relative">
              <div className="flex justify-between text-[#1132F5] text-left font-semibold text-[12px] leading-[17px]">
                <span>0</span>
                <span>500000</span>
              </div>

              <Slider
                value={priceRange}
                onChange={handleSliderChange}
                className="w-full [&_span.MuiSlider-thumb]:w-4 [&_span.MuiSlider-thumb]:h-4 [&_span.MuiSlider-thumb]:bg-[#1132F5] [&_span.MuiSlider-thumb]:rounded-[30px] [&_span.MuiSlider-thumb]:border-[2px] [&_span.MuiSlider-thumb]:border-white
                    [&_span.MuiSlider-track]:bg-[#1132F5] [&_span.MuiSlider-track]:border-none
                    [&_span.MuiSlider-rail]:bg-[#1132F5]"
                valueLabelDisplay="auto"
                min={0}
                max={500000}
                step={5000}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[24px] w-full">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Number of roommates
            </p>

            <ul className="flex gap-[20px]">
              {housematesCount.map((room) => (
                <li
                  key={room}
                  onClick={() => setHousemates(room)}
                  className={`${
                    housemates === room
                      ? "bg-[#1132F5] text-[#FFFFFF]"
                      : "bg-[#D1EDE6] text-[#5c5c5c]"
                  } h-[34px] w-[48px] flex items-center justify-center rounded-[5px] cursor-pointer font-light text-[14px] leading-[17.5px]`}
                >
                  {room}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[20px] w-full">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Number of rooms
            </p>

            <div className="flex items-center justify-around w-[100px] h-[40px] border rounded-lg text-[20px] border-gray-300">
              <button
                onClick={() =>
                  setRoommates((prev: any) => Math.max(prev - 1, 1))
                }
                className=""
              >
                <Images.minus w={"16"} h={"16"} />
              </button>

              <span className="text-[14px] font-normal text-center text-[#252525]">
                {roommates}
              </span>

              <button
                onClick={() =>
                  setRoommates((prev: any) => Math.min(prev + 1, 10))
                }
                className=""
              >
                <Images.plus w={"16"} h={"16"} />
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full gap-[24px]">
            <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
              Age
            </p>

            <div className="relative">
              <div className="flex justify-between text-[#1132F5] text-left font-semibold text-[12px] leading-[17px]">
                <span>0</span>
                <span>50</span>
              </div>

              <Slider
                value={ageRange}
                className="w-full [&_span.MuiSlider-thumb]:w-4 [&_span.MuiSlider-thumb]:h-4 [&_span.MuiSlider-thumb]:bg-[#1132F5] [&_span.MuiSlider-thumb]:rounded-[30px] [&_span.MuiSlider-thumb]:border-[2px] [&_span.MuiSlider-thumb]:border-white
                    [&_span.MuiSlider-track]:bg-[#1132F5] [&_span.MuiSlider-track]:border-none
                    [&_span.MuiSlider-rail]:bg-[#1132F5]"
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} years`}
                min={18}
                max={50}
                step={1}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-[24px]">
            <div className="text-[#252525] flex items-center gap-[20px] font-normal text-[14px] leading-[17.5px] text-left">
              Move-in date
              <div className="flex gap-[16px]">
                <label
                  htmlFor="today"
                  className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id="today"
                    checked={isToday}
                    onChange={() => handleCheckboxChange("today")}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                      isToday ? "border-[#1132F5]" : "border-gray-300"
                    }`}
                  >
                    {isToday && <Images.check />}
                  </div>
                  Today
                </label>

                <label
                  htmlFor="tomorrow"
                  className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id="tomorrow"
                    checked={isTomorrow}
                    onChange={() => handleCheckboxChange("tomorrow")}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                      isTomorrow ? "border-[#1132F5]" : "border-gray-300"
                    }`}
                  >
                    {isTomorrow && <Images.check />}
                  </div>
                  Tomorrow
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="date"
                value={moveInDate}
                onChange={handleDateChange}
                className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
              />
            </div>
          </div>

          {moreFilters && (
            <>
              <div className="flex flex-col w-full gap-[24px]">
                <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                  Room area
                </p>

                <div className="flex gap-[10px]">
                  <input
                    type="number"
                    value={roomSize[0]}
                    onChange={(e) => handleRoomSizeChange(e, 0)}
                    placeholder="From"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
                  />
                  <input
                    type="number"
                    value={roomSize[1]}
                    onChange={(e) => handleRoomSizeChange(e, 1)}
                    placeholder="To"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-[24px]">
                <p className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left">
                  Floor
                </p>

                <div className="flex gap-[10px]">
                  <input
                    type="number"
                    value={floors[0]}
                    onChange={(e) => handleFloorChange(e, 0)}
                    placeholder="From"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
                  />
                  <input
                    type="number"
                    value={floors[1]}
                    onChange={(e) => handleFloorChange(e, 1)}
                    placeholder="To"
                    className="w-full border-[1px] focus:text-[#252525] border-[#EBEBEB] rounded-[5px] px-[15px] py-[10px] text-left text-[14px] font-normal leading-[18px] outline-none focus:outline-none focus:border-[#1132F5] text-[#B5B7C0]"
                  />
                </div>

                <div className="flex gap-[16px]">
                  <label
                    htmlFor="notFirstFloor"
                    className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      id="notFirstFloor"
                      checked={isNotFirstFloor}
                      onChange={() => handleCheckboxChange("notFirstFloor")}
                      className="hidden"
                    />
                    <div
                      className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                        isNotFirstFloor ? "border-[#1132F5]" : "border-gray-300"
                      }`}
                    >
                      {isNotFirstFloor && <Images.check />}
                    </div>
                    Not first floor?
                  </label>

                  <label
                    htmlFor="notLastFloor"
                    className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      id="notLastFloor"
                      checked={isNotLastFloor}
                      onChange={() => handleCheckboxChange("notLastFloor")}
                      className="hidden"
                    />
                    <div
                      className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                        isNotLastFloor ? "border-[#1132F5]" : "border-gray-300"
                      }`}
                    >
                      {isNotLastFloor && <Images.check />}
                    </div>
                    Not top floor?
                  </label>
                </div>
              </div>

              <ToggleButton
                label="For long term?"
                value={longTerm}
                onChange={setLongTerm}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              <ToggleButton
                label="Pets allowed?"
                value={petsAllowed}
                onChange={setPetsAllowed}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              <ToggleButton
                label="Utilities included?"
                value={utilitiesIncluded}
                onChange={setUtilitiesIncluded}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              <ToggleButton
                label="Student friendly?"
                value={forStudents}
                onChange={setForStudents}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              <ToggleButton
                label="Bad habits allowed?"
                value={badHabitsAllowed}
                onChange={setBadHabitsAllowed}
                className="text-[#252525] font-normal text-[14px] leading-[17.5px] text-left"
              />

              <div className="flex flex-col w-full gap-[24px]">
                <div className="w-full text-[#252525] flex items-center gap-[20px] font-normal text-[14px] leading-[17.5px] text-left">
                  Property type?
                  <div className="ml-[100px] flex gap-[16px]">
                    <label
                      htmlFor="propertyTypeApartment"
                      className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        id="propertyTypeApartment"
                        checked={propertyType === "Apartment"}
                        onChange={() => setPropertyType("Apartment")}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                          propertyType === "Apartment"
                            ? "border-[#1132F5]"
                            : "border-gray-300"
                        }`}
                      >
                        {propertyType === "Apartment" && <Images.check />}
                      </div>
                      Apartment
                    </label>

                    <label
                      htmlFor="propertyTypeHouse"
                      className="flex items-center text-[14px] text-[#252525] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        id="propertyTypeHouse"
                        checked={propertyType === "House"}
                        onChange={() => setPropertyType("House")}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 mr-2 flex items-center justify-center rounded border outline-none ${
                          propertyType === "House"
                            ? "border-[#1132F5]"
                            : "border-gray-300"
                        }`}
                      >
                        {propertyType === "House" && <Images.check />}
                      </div>
                      House
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
            className="w-1/2 flex items-center justify-center gap-[10px] py-[10px] text-[14px] font-semibold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100"
          >
            <span>{moreFilters ? "Reduce filter" : "Detailed filter"}</span>
            <Images.filter />
          </button>
          <button
            onClick={saveFilter}
            className="w-1/2 flex items-center justify-center gap-[10px] py-[10px] text-[14px] font-semibold text-[#252525] border-[1px] border-[#252525] rounded-lg hover:bg-gray-100"
          >
            <span>Save search</span>
            <Images.search color="black" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className={`mt-[24px] py-[15px] text-[16px] font-semibold leading-[20px] tracking-[0.2px] rounded-[5px] bg-[#32343A] text-[#FFFFFF]`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
