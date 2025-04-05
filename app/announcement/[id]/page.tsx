"use client";
import React, { useState, useEffect, use } from "react";
import axiosInstance from "@/axiosInstance/axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import * as Image from "../../../public/images";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import { mockData } from "../mockData";
import useIsMobile from "@/app/utils/useIsMobile";

interface Announcement {
  id: number;
  title: string;
  apartmentsInfo: string;
  cost: number;
  deposit: number;
  minAmountOfCommunalService: number;
  maxAmountOfCommunalService: number;
  arriveDate: string;
  typeOfHousing: string;
  quantityOfRooms: number;
  areaOfTheApartment: number;
  numberOfFloor: number;
  maxFloorInTheBuilding: number;
  howManyPeopleLiveInThisApartment: number;
  numberOfPeopleAreYouAccommodating: number;
  region: string;
  district: string;
  microDistrict: string;
  preferences: string[];
  photos: { id: number; url: string }[];
  user: {
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
  };
  phoneNumber: string;
}

interface AnnouncementPageProps {
  params: Promise<{ id: string }>;
}

const AnnouncementPage = ({ params }: AnnouncementPageProps) => {
  const { id } = use(params);

  const isMobile = useIsMobile();
  const is485 = useIsMobile(485);
  const is440 = useIsMobile(440);

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab).scrollIntoView({ behavior: "smooth" });
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? (announcement?.photos.length || 1) - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === (announcement?.photos.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen) {
        if (event.key === "ArrowLeft") {
          goToPreviousImage();
        } else if (event.key === "ArrowRight") {
          goToNextImage();
        } else if (event.key === "Escape") {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, goToPreviousImage, goToNextImage, closeModal]);

  useEffect(() => {
    console.log("useEffect triggered, id is:", id);
    console.log(mockData);
    setAnnouncement(mockData);
    console.log(announcement);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center my-[30px]">
          <div className="w-full max-w-[1300px] space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton
                variant="rectangular"
                height={500}
                className="col-span-2 rounded-lg"
              />
              <div className="col-span-2 grid grid-rows-2 grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height="100%"
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-3 space-y-4">
                <Skeleton variant="text" height={40} width="70%" />
                <Skeleton variant="text" height={20} width="90%" />
                <Skeleton
                  variant="rectangular"
                  height={150}
                  className="rounded-lg"
                />
              </div>

              <div className="col-span-2 space-y-4">
                <Skeleton
                  variant="rectangular"
                  height={200}
                  className="rounded-lg"
                />
                <Skeleton
                  variant="rectangular"
                  height={150}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-3xl font-semibold text-gray-700">Oops!</h1>
          <p className="text-lg text-gray-600">
            We couldn't find this listing.
          </p>
          <Link
            href="/"
            className="text-lg text-[#1132F5] underline hover:no-underline"
          >
            Return to homepage
          </Link>
          <button onClick={() => console.log(announcement)}>button</button>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${isMobile ? "pb-16" : ""}`}>
      <Header />

      <div className="flex-grow flex justify-center my-[30px] mx-4">
        <div className="w-full max-w-[1300px]">
          <div className="grid grid-cols-4 gap-4">
            <div
              className="col-span-4 sm:col-span-2"
              onClick={() => openModal(0)}
            >
              <img
                src={announcement.photos[0]?.url || "/default-image.svg"}
                alt="Main Image"
                className="rounded-lg w-full h-[300px] sm:h-[500px] object-cover"
              />
            </div>

            <div className="col-span-2 hidden sm:block">
              <div className="grid grid-rows-2 grid-cols-2 gap-4 h-[500px]">
                {announcement.photos.slice(1, 5).map((photo, index) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={`Photo ${index + 1}`}
                    className="rounded-lg w-full h-full object-cover cursor-pointer"
                    onClick={() => openModal(index + 1)}
                  />
                ))}

                {announcement.photos.length > 5 && (
                  <div className="relative">
                    <img
                      src={announcement.photos[5].url}
                      alt="More Photos"
                      className="rounded-lg w-full h-full object-cover"
                    />
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-semibold rounded-lg"
                      onClick={() => openModal(5)}
                    >
                      Show all photos
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-8 my-8">
            <div className="col-span-5 lg:col-span-3 space-y-6">
              <h1 className="font-circular text-[28px] sm:text-[32px] md:text-[36px] font-semibold">
                {announcement.title}
              </h1>
              <div className="flex items-center text-gray-600 space-x-[10px] flex-wrap gap-y-[10px]">
                <div className="flex items-center justify-center space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 border rounded-lg bg-white shadow-sm">
                  <Image.roomCount />
                  <span className="text-[#252525] text-[14px] lg:text-[16px] font-semibold">
                    {announcement.quantityOfRooms} rooms
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 border rounded-lg bg-white shadow-sm">
                  <Image.apartmentArea />
                  <span className="text-[#252525] text-[14px] lg:text-[16px] font-semibold">
                    {announcement.areaOfTheApartment} m²
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 border rounded-lg bg-white shadow-sm">
                  <Image.apartmentType />
                  <span className="text-[#252525] text-[14px] lg:text-[16px] font-semibold">
                    {announcement.typeOfHousing}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-2 py-1.5 sm:px-4 sm:py-2 border rounded-lg bg-white shadow-sm">
                  <Image.maxPeople />
                  <span className="text-[#252525] text-[14px] lg:text-[16px] font-semibold">
                    {announcement.numberOfPeopleAreYouAccommodating} max
                  </span>
                </div>
              </div>
              <div>
                <nav className="flex space-x-[24px] font-circular text-[16px] text-[#B5B7C0] leading-[20px]">
                  <button
                    onClick={() => handleTabClick("description")}
                    className={`${
                      activeTab === "description"
                        ? "font-semibold border-b border-[#1132F5] text-[#1132F5]"
                        : ""
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => handleTabClick("information")}
                    className={`${
                      activeTab === "information"
                        ? "font-semibold border-b border-[#1132F5] text-[#1132F5]"
                        : ""
                    }`}
                  >
                    Information
                  </button>
                  <button
                    onClick={() => handleTabClick("qualities")}
                    className={`${
                      activeTab === "qualities"
                        ? "font-semibold border-b border-[#1132F5] text-[#1132F5]"
                        : ""
                    }`}
                  >
                    Preferences
                  </button>
                </nav>
              </div>

              <div className="w-full sm:w-4/5 mt-[30px] flex flex-col space-y-10">
                <div id="description" className="space-y-4">
                  <h2 className="font-circular text-[20px] sm:text-[24px] font-semibold">
                    Description
                  </h2>
                  <div className="">
                    <p className="text-[#252525] text-[15px] sm:text-[16px] leading-[24px]">
                      {announcement.apartmentsInfo}
                    </p>
                  </div>
                  <hr className="mt-[20px]" />
                </div>

                <div
                  id="information"
                  className="space-y-4 text-[15px] sm:text-[16px]"
                >
                  <h2 className="font-circular text-[20px] sm:text-[24px] font-semibold">
                    Information
                  </h2>

                  <div className="w-full sm:w-4/5 grid grid-cols-2 gap-y-[24px]">
                    <div className="text-[#4D4D4D]">City:</div>
                    <div className="text-[#252525] font-semibold flex flex-col">
                      {announcement.region}, {announcement.district}
                    </div>

                    <div className="text-[#4D4D4D]">Type of housing:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.typeOfHousing}
                    </div>

                    <div className="text-[#4D4D4D]">Floor:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.numberOfFloor} of{" "}
                      {announcement.maxFloorInTheBuilding}
                    </div>

                    <div className="text-[#4D4D4D]">Area:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.areaOfTheApartment} m²
                    </div>

                    <div className="text-[#4D4D4D]">Current residents:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.howManyPeopleLiveInThisApartment}
                    </div>

                    <div className="text-[#4D4D4D]">Looking for:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.numberOfPeopleAreYouAccommodating}
                    </div>
                  </div>

                  <hr className="mt-[20px]" />
                </div>

                <div id="qualities" className="col-span-3 mt-8">
                  <h2 className="font-circular text-[20px] sm:text-[24px] font-semibold">
                    Preferences
                  </h2>
                  <ul className="flex flex-wrap gap-4 mt-4">
                    {announcement.preferences?.map((quality, index) => (
                      <li
                        key={index}
                        className="text-[#252525] text-[15px] sm:text-[16px] flex items-center space-x-2"
                      >
                        <Image.marked />
                        <span>{quality}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {isMobile ? (
              <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-xl px-4 py-3 flex items-center justify-between lg:hidden z-50">
                <div>
                  <p className="text-[20px] font-bold text-[#252525]">
                    ${announcement.cost} / month
                  </p>
                  <p className="text-sm text-gray-500">
                    Available from {announcement.arriveDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${announcement.phoneNumber}`}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-[14px] font-semibold"
                  >
                    <Image.callIcon />
                    {!is440 && (
                      <span>{announcement.phoneNumber.slice(0, 4)}...</span>
                    )}
                  </a>
                  <a
                    href={`https://wa.me/${announcement.phoneNumber}`}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-[#1132F5] rounded-lg text-[14px] font-semibold"
                  >
                    <Image.whatsappIcon />
                    {!is440 && <span>Message</span>}
                  </a>
                </div>
              </div>
            ) : (
              <div className="col-span-4 lg:col-span-2 h-full ">
                <div className="sticky top-6">
                  <div className="flex flex-col md:flex-row lg:flex-col gap-4">
                    <div className="flex-1 p-6 border rounded-lg space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-[30px] lg:text-[32px] font-semibold text-[#252525] leading-[45px]">
                          ${announcement.cost}
                        </h2>
                        <span className="text-gray-500 text-[14px] leading-[20px]">
                          / month
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[15px] lg:text-[16px] text-gray-500 leading-[20px]">
                          Deposit:
                        </p>
                        <p className="text-[#252525] text-[15px] lg:text-[16px] leading-[20px]">
                          ${announcement.deposit}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[15px] lg:text-[16px] text-gray-500 leading-[20px]">
                          Utilities:
                        </p>
                        <p className="text-[#252525] text-[15px] lg:text-[16px] leading-[20px]">
                          ${announcement.minAmountOfCommunalService} -{" "}
                          ${announcement.maxAmountOfCommunalService}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-[15px] lg:text-[16px] text-gray-500 leading-[20px]">
                          Available from:
                        </p>
                        <p className="text-[#252525] text-[15px] lg:text-[16px] leading-[20px]">
                          {announcement.arriveDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 p-6 border rounded-lg space-y-4">
                      <p className="text-[13px] lg:text-[14px] text-[#4D4D4D] leading-[20px]">
                        You can contact the residents to discuss any questions...
                      </p>

                      <div className="flex items-start flex-col space-y-1">
                        <div className="flex items-center space-x-4">
                          <img
                            src={
                              announcement.user.profilePhoto || "/userSmall.png"
                            }
                            alt="user"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-[#252525] text-[14px] lg:text-[15px] font-semibold">
                              {announcement.user.firstName}{" "}
                              {announcement.user.lastName}
                            </p>
                            <p className="text-[13px] lg:text-[14px] text-[#4D4D4D]">
                              resident
                            </p>
                          </div>
                        </div>

                        <div className="flex space-y-2 xl:space-x-4 w-full xl:w-auto flex-col lg:flex-row">
                          <a
                            href={`tel:${announcement.phoneNumber}`}
                            className="flex items-center justify-center space-x-2 px-4 w-full py-2 rounded-lg shadow-sm text-[13px] lg:text-[14px] font-semibold"
                          >
                            <Image.callIcon />
                            <span>{announcement.phoneNumber}</span>
                          </a>
                          <a
                            href={`https://wa.me/${announcement.phoneNumber}`}
                            className="flex items-center justify-center space-x-2 px-4 py-2 w-full rounded-lg shadow-sm text-[13px] lg:text-[14px] font-semibold"
                          >
                            <Image.whatsappIcon />
                            <span>Message</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 overflow-auto p-4">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-semibold"
            onClick={closeModal}
          >
            &times;
          </button>

          <div className="relative flex flex-col items-center">
            <img
              src={announcement.photos[currentImageIndex]?.url}
              alt={`Image ${currentImageIndex + 1}`}
              className="rounded-lg max-h-[90vh] w-auto object-contain"
            />

            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-180"
              onClick={goToPreviousImage}
            >
              <img
                src="/right.svg"
                alt="previous"
                className="w-8 h-8 sm:w-12 sm:h-12"
              />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={goToNextImage}
            >
              <img
                src="/right.svg"
                alt="next"
                className="w-8 h-8 sm:w-12 sm:h-12"
              />
            </button>

            <div className="absolute bottom-8 text-white text-lg font-medium bg-black bg-opacity-60 px-3 py-1 rounded-md">
              {currentImageIndex + 1} / {announcement.photos.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AnnouncementPage;