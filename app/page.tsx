"use client";

import FilterModal from "@/components/filter-modal";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import * as Images from "@/public/images";
import HomeCard from "@/components/home-card";
import { useRouter, useSearchParams } from "next/navigation";
import Map from "@/components/Map";
import Skeleton from "@mui/material/Skeleton";

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

const sortMapping = {
  "Most relevant": 1,
  "Price: low to high": 2,
  "Newest first": 3,
  "Price: high to low": 4,
};

export default function Home() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [viewType, setViewType] = useState<"lists" | "map">("lists");
  const [selectedSort, setSelectedSort] = useState<string>("Most relevant");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isMapDropdownOpen, setMapDropdownOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/mockHomeCards.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error: any) {
        console.error("Error fetching local data:", error);
        setErrorMessage(error.message || "Failed to fetch local data");
      } finally {
        setLoading(false);
      }
    };

    fetchLocalData();
  }, []);

  const renderSkeletonCard = () => (
    <div className="relative">
      <div
        className="min-h-[345px] min-w-[267px] rounded-[10px] p-[16px] gap-[26px] bg-white flex flex-col justify-between items-start"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
      >
        <Skeleton
          variant="rectangular"
          width={240}
          height={130}
          style={{ borderRadius: "10px" }}
        />
        <div className="flex flex-col gap-[16px] justify-start w-full">
          <div className="flex flex-col gap-[8px] justify-start">
            <Skeleton variant="text" width="80%" height={24} />
            <span className="flex">
              <Skeleton variant="text" width="60%" height={16} />
            </span>
          </div>
          <div className="flex items-center justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-[4px]">
                <Skeleton variant="circular" width={14} height={14} />
                <Skeleton variant="text" width={40} height={16} />
              </div>
            ))}
          </div>
          <Skeleton variant="text" width="50%" height={20} />
          <Skeleton variant="text" width="30%" height={16} />
        </div>
      </div>
    </div>
  );

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const toggleMapDropdown = () => {
    setMapDropdownOpen(true);
    setViewType("map");
  };

  const [isFilterVisible, setFilterVisible] = useState(true);
  const handleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="min-h-full min-w-full space-y-[20px]">
      <Header isFilterResults={false} />

      {isMapDropdownOpen ? (
        <div className="bg-white relative w-full h-[90vh]">
          <div className="absolute inset-0 z-0">
            <Map announcements={announcements} />
          </div>

          {isFilterVisible && !isMobile && (
            <div className="absolute left-10 top-5 z-10 bg-white p-4 rounded-lg shadow-lg flex flex-col items-end">
              <button
                onClick={handleFilterVisibility}
                className="text-gray-600 hover:text-gray-900 text-2xl mb-[10px]"
              >
                <Images.close />
              </button>
              <FilterModal onSubmit={() => null} initialQuery={null} />
            </div>
          )}

          <div
            className={
              isMobile
                ? "absolute w-full top-0 flex justify-center h-[60px]"
                : "absolute top-10 right-10 z-10 flex gap-4"
            }
            style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
          >
            <button
              onClick={() => {
                setMapDropdownOpen(false);
                setViewType("lists");
              }}
              className="flex items-center justify-center gap-2 bg-white text-black border border-[#BFBFBF4D] hover:bg-gray-100 w-full md:w-auto px-4 py-2"
            >
              <Images.ListIcon />
              List View
            </button>
            {isMobile ? (
              <FilterModal onSubmit={() => null} initialQuery={null} />
            ) : (
              <button
                onClick={handleFilterVisibility}
                className="flex items-center justify-center gap-2 bg-white text-black border border-[#BFBFBF4D] hover:bg-gray-100 w-full md:w-auto px-4 py-2 "
              >
                <Images.filterIcon />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-grow w-screen xl:px-10 2xl:px-10 md:px-10">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <div className="flex flex-col w-full md:flex-row justify-around gap-[20px] md:gap-[25px]">
            <div
              className={
                isMobile
                  ? "w-full flex flex-row h-[60px]"
                  : "md:min-w-[300px] lg:min-w-[350px] xl:min-w-[450px]"
              }
              style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
            >
              {isMobile && (
                <button
                  type="button"
                  onClick={toggleMapDropdown}
                  className="flex items-center justify-center gap-2 bg-white text-black border border-[#BFBFBF4D] hover:bg-gray-100 w-full md:w-auto px-4 py-2 "
                >
                  <Images.map />
                  Map
                </button>
              )}
              <FilterModal onSubmit={() => null} initialQuery={null} />
            </div>

            <div className="flex flex-col w-full gap-[12px]">
              <div className="flex justify-between items-center">
                {!isMobile && (
                  <div className="relative">
                    <div
                      className="flex items-center gap-[12px] cursor-pointer"
                      onClick={toggleSortDropdown}
                    >
                      <p className="text-left text-[14px] font-normal leading-[18px] text-[#5c5c5c]">
                        {selectedSort}
                      </p>
                      <Images.arrowDown w={"20"} h={"20"} color={"#5c5c5c"} />
                    </div>
                    {isSortDropdownOpen && (
                      <div className="absolute top-[30px] left-[-10px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left z-10">
                        <ul className="flex flex-col">
                          {[
                            "Most relevant",
                            "Price: low to high",
                            "Newest first",
                            "Price: high to low",
                          ].map((sortOption) => (
                            <li
                              key={sortOption}
                              onClick={() => {
                                setSelectedSort(sortOption);
                                setIsSortDropdownOpen(false);
                              }}
                              className={`${
                                sortOption === selectedSort
                                  ? "bg-[#D1D6F5] text-[#1132F5]"
                                  : "bg-white text-[#252525]"
                              } w-full px-[12px] py-[4px] rounded-[5px] cursor-pointer font-normal text-[14px] leading-[17.5px]`}
                            >
                              {sortOption}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {!isMobile && (
                  <button type="button" onClick={toggleMapDropdown}>
                    <Images.map />
                  </button>
                )}
              </div>

              <div className="flex justify-center w-full">
                <div className="w-full px-[30px] md:px-[10px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-x-[10px] gap-y-[10px] ">
                  {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>{renderSkeletonCard()}</div>
                      ))
                    : announcements.map((announcement) => (
                        <HomeCard
                          key={announcement.announcementId}
                          card={announcement}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
