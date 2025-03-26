"use client";

import Filter from "@/components/filter";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import axiosInstance from "@/axiosInstance/axios";
import * as Images from "@/public/images"; // Import images
import Link from "next/link";
import Card from "@/components/card";
import HomeCard from "@/components/home-card";
import { useRouter, useSearchParams } from "next/navigation";
import Map from "@/components/Map";
import Skeleton from "@mui/material/Skeleton";

const sortMapping = {
  "Самые подходящие": 1,
  "По возрастанию цены": 2,
  "По новизне": 3,
  "По убыванию цены": 4,
};

export default function Home() {
  const [query, setQuery] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialQuery, setInitialQuery] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [viewType, setViewType] = useState<"lists" | "map">("lists");
  const [selectedSort, setSelectedSort] = useState<string>("Самые подходящие");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isMapDropdownOpen, setMapDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleFilterSubmit = (queryObject: any) => {
    setQuery(queryObject);
  };
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchAllAnnouncements = async (filters) => {
    try {
      setLoading(true);
      const endpoint =
        filters.viewType === "lists"
          ? "/announcement/all"
          : "/announcement/all-for-map";

      const response = await axiosInstance.get(endpoint, { params: filters });

      // If the server returns { announcements: [...], ... }:
      if (Array.isArray(response.data.announcements)) {
        setAnnouncements(response.data.announcements);
      } else if (Array.isArray(response.data)) {
        // If the server just returns an array
        setAnnouncements(response.data);
      } else {
        setAnnouncements([]);
      }

      setErrorMessage("");
    } catch (error) {
      // ✅ Put something valid here:
      console.error("Error fetching announcements:", error);
      setErrorMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    // Construct filters dynamically, parsing numerical values as needed
    const filters = {
      region: params.region || undefined,
      district: params.district || undefined,
      microDistrict: params.microDistrict || undefined,
      minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined, // Parse minPrice as integer
      maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined, // Parse maxPrice as integer
      gender: params.gender || undefined,
      roommatesCount: params.roommatesCount
        ? parseInt(params.roommatesCount, 10) // Parse roommatesCount as integer
        : undefined,
      sort: sortMapping[selectedSort] || 1, // Default sort if undefined
      viewType, // Add viewType dynamically
    };

    // Update the query string in the URL
    const updatedParams = {
      ...params,
      sort: sortMapping[selectedSort], // Update the sort value in the query
    };

    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(updatedParams).filter(([_, v]) => v !== undefined)
      )
    ).toString();

    // Update the URL with the new query string
    router.replace(`/?${queryString}`, { shallow: true });

    // Fetch announcements with the updated filters
    fetchAllAnnouncements(filters);
  }, [searchParams, selectedSort, viewType]);

  // useEffect(() => {
  //   // Check if there's a saved filter in sessionStorage on page load
  //   const savedFilter = sessionStorage.getItem("savedFilter");
  //   if (savedFilter) {
  //     // Ask user if they want to autofill their saved filter
  //     const userWantsToLoad = window.confirm(
  //       "У вас есть сохраненный фильтр. Хотите его загрузить?"
  //     );
  //     if (userWantsToLoad) {
  //       const parsedFilter = JSON.parse(savedFilter);
  //       console.log(parsedFilter);
  //       setInitialQuery(parsedFilter);
  //       setQuery(parsedFilter);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (query) {
      // Example GET request using query parameters
      // If your backend expects POST with JSON, use axiosInstance.post("/announcement/search", query)
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/announcement/filter", {
            params: query,
          });
          setAnnouncements(response.data || []);
          setErrorMessage("");
        } catch (error: any) {
          console.error(
            "Error fetching announcements:",
            error.response?.data?.message || error.message
          );
          setErrorMessage(
            error.response?.data?.message || "Failed to fetch announcements"
          );
        }
      };

      fetchData();
    }
  }, [query]);

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };
  const toggleMapDropdown = () => {
    setMapDropdownOpen(true);
    setViewType("map");
  };

  const [isFilterVisible, setFilterVisible] = useState(true); // State for filter visibility

  const handleFilterVisibility = () => {
    setFilterVisible(!isFilterVisible); // Toggle filter visibility
  };

  const renderSkeletonCard = () => (
    <div className="relative">
      <div
        className="min-h-[345px] min-w-[267px] rounded-[10px] p-[16px] gap-[26px] bg-white flex flex-col justify-between items-start"
        style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
      >
        {/* Skeleton for image */}
        <Skeleton
          variant="rectangular"
          width={240}
          height={130}
          style={{ borderRadius: "10px" }}
        />

        <div className="flex flex-col gap-[16px] justify-start w-full">
          <div className="flex flex-col gap-[8px] justify-start">
            {/* Skeleton for title */}
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

          {/* Skeleton for price */}
          <Skeleton variant="text" width="50%" height={20} />

          {/* Skeleton for action link */}
          <Skeleton variant="text" width="30%" height={16} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full min-w-full space-y-[40px]">
      <Header isFilterResults={false} />

      {isMapDropdownOpen ? (
        <div className="relative w-full h-[90vh]">
          {/* Map Background */}
          <div className="absolute inset-0 z-0">
            <Map announcements={announcements} />
          </div>

          {/* Filter in the Foreground */}
          {isFilterVisible && (
            <div className="absolute left-10 top-5 z-10 bg-white p-4 rounded-lg shadow-lg flex flex-col items-end">
              <button
                onClick={handleFilterVisibility} // Close filter
                className="text-gray-600 hover:text-gray-900 text-2xl mb-[10px]"
              >
                <Images.close />
              </button>
              <Filter
                onSubmit={handleFilterSubmit}
                initialQuery={initialQuery}
              />
            </div>
          )}

          {/* "To List View" Button */}
          <div className="absolute top-10 right-10 z-10 flex gap-4">
            {/* Button 1 */}
            <button
              onClick={handleFilterVisibility}
              className="bg-white text-black px-5 py-4 rounded-lg border-[1px] border-[#BFBFBF4D] text-[24px]"
            >
              <Images.filterIcon />
            </button>

            {/* Button 2 */}
            <button
              onClick={() => {
                setMapDropdownOpen(false);
                setViewType("lists");
              }}
              className="bg-white text-black px-10 py-4 rounded-lg border-[1px] border-[#BFBFBF4D] text-[24px]"
            >
              Списком
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow w-[1300px] mx-auto">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <div className="flex justify-between gap-[45px]">
            <Filter onSubmit={handleFilterSubmit} initialQuery={initialQuery} />
            <div className="flex flex-col w-full gap-[12px] ">
              <div className="flex justify-between items-center">
                <div className="relative">
                  <div
                    className="flex items-center gap-[12px] cursor-pointer"
                    onClick={toggleSortDropdown}
                  >
                    <p className="text-left text-[14px] font-normal leading-[18px] text-[#5c5c5c">
                      {selectedSort}
                    </p>
                    <Images.arrowDown w={"20"} h={"20"} color={"#5c5c5c"} />
                  </div>
                  {isSortDropdownOpen && (
                    <div className="absolute top-[30px] left-[-10px] bg-white space-y-[12px] min-w-[200px] rounded-[5px] text-left z-10">
                      <ul className="flex flex-col">
                        {[
                          "Самые подходящие",
                          "По возрастанию цены",
                          "По новизне",
                          "По убыванию цены",
                        ].map((sortOption) => (
                          <li
                            key={sortOption}
                            onClick={() => {
                              setSelectedSort(sortOption);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`${
                              sortOption === selectedSort
                                ? "bg-[#D1EDE6] text-[#1AA683]"
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
                <button type="button" onClick={toggleMapDropdown}>
                  <Images.map />
                </button>
              </div>
              {/* <div className="flex justify-center">
                {announcements && announcements.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {announcements.map((announcement: any, index: number) => (
                      <Link
                        href={`/announcement/${announcement.announcementId}`}
                        key={announcement.announcementId}>
                        <HomeCard card={announcement} />
                      </Link>
                    ))}
                  </div>
                )}
              </div> */}
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>{renderSkeletonCard()}</div>
                      ))
                    : announcements &&
                      announcements.length > 0 &&
                      announcements.map((announcement) => (
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
