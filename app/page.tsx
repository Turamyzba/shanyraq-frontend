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

export default function Home() {
  const [query, setQuery] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialQuery, setInitialQuery] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  const handleFilterSubmit = (queryObject: any) => {
    // queryObject matches the swagger schema
    console.log(queryObject);
    setQuery(queryObject);
  };

  useEffect(() => {
    // Check if there's a saved filter in sessionStorage on page load
    const savedFilter = sessionStorage.getItem("savedFilter");
    if (savedFilter) {
      // Ask user if they want to autofill their saved filter
      const userWantsToLoad = window.confirm(
        "У вас есть сохраненный фильтр. Хотите его загрузить?"
      );
      if (userWantsToLoad) {
        const parsedFilter = JSON.parse(savedFilter);
        console.log(parsedFilter);
        setInitialQuery(parsedFilter);
        setQuery(parsedFilter);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      try {
        const response = await axiosInstance.get("/announcement/all");
        // Assuming response.data is an array of announcements
        setAnnouncements(response.data || []);
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

    fetchAllAnnouncements();
  }, []);

  useEffect(() => {
    if (query) {
      // Example GET request using query parameters
      // If your backend expects POST with JSON, use axiosInstance.post("/announcement/search", query)
      const fetchData = async () => {
        try {
          const response = await axiosInstance.post(
            "/announcement/filter",
            query,  
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
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

  return (
    <div className="min-h-full min-w-full space-y-[40px]">
      <Header isFilterResults={false} />
      <div className="flex-grow w-[1300px] mx-auto">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <div className="flex justify-between gap-[45px]">
          <Filter onSubmit={handleFilterSubmit} initialQuery={initialQuery} />
          <div className="flex flex-col w-full gap-[12px] ">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[12px]">
                <p className="text-left text-[14px] font-normal leading-[18px] text-[#5c5c5c">
                  Самые подходящие
                </p>
                <Images.arrowDown w={"20"} h={"20"} color={"#5c5c5c"} />
              </div>
              <Images.map />
            </div>
            <div className="flex justify-center">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
