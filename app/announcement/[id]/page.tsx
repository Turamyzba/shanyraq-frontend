"use client";
import React, { useState, useEffect, use } from "react";
// import { useRouter } from 'next/navigation'; // Удаляем этот импорт
import axiosInstance from "@/axiosInstance/axios";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import * as Image from "../../../public/images";

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
  qualities: string[];
  photos: { id: number; url: string }[];
  user: {
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
  };
  // Добавьте другие необходимые поля
}

interface AnnouncementPageProps {
  params: Promise<{ id: string }>;  
}

const AnnouncementPage = ({ params }: AnnouncementPageProps) => {
  const { id } = use(params); // Получаем id из параметров маршрута

  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Функции для модального окна
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
    const fetchAnnouncement = async () => {
      try {
        const response = await axiosInstance.get(`/announcement/detail/${id}`);
        setAnnouncement(response.data);
      } catch (error) {
        console.error("Ошибка при получении объявления:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!announcement) {
    return <div>Объявление не найдено</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex justify-center my-[30px]">
        <div className="w-full max-w-[1300px]">
          {/* Top Section with Images */}
          <div className="grid grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="col-span-2" onClick={() => openModal(0)}>
              <img
                src={announcement.photos[0]?.url || "/default-image.svg"}
                alt="Main Image"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Smaller Images */}
            <div className="col-span-2">
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
                      Показать все фото
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <div className="grid grid-cols-5 gap-8 my-8">
            <div className="col-span-3 space-y-6">
              <h1 className="font-circular text-[36px] font-semibold">
                {announcement.title}
              </h1>
              <div className="flex items-center text-gray-600 space-x-[10px]">
                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.roomCount />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    {announcement.quantityOfRooms} комнат
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.apartmentArea />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    {announcement.areaOfTheApartment} м²
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.apartmentType />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    {announcement.typeOfHousing}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.maxPeople />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    {announcement.numberOfPeopleAreYouAccommodating} максимум
                  </span>
                </div>
              </div>
              <div>
                <nav className="flex space-x-[24px] font-circular text-[16px] text-[#B5B7C0] leading-[20px]">
                  <a className="font-semibold border-b border-[#1AA683] text-[#1AA683]">
                    Описание
                  </a>
                  <a>Информация</a>
                  <a>Цена</a>
                  <a>Качества</a>
                </nav>
              </div>

              <div className="w-4/5 mt-[30px] flex flex-col space-y-10">
                {/* Description */}
                <div className="space-y-4">
                  <h2 className="font-circular text-[24px] font-semibold">
                    Описание
                  </h2>
                  <div className="">
                    <p className="text-[#252525] leading-[24px]">
                      {announcement.apartmentsInfo}
                    </p>
                  </div>
                  <hr className="mt-[20px]" />
                </div>

                {/* Information */}
                <div className="space-y-4">
                  <h2 className="font-circular text-[24px] font-semibold">
                    Информация
                  </h2>

                  <div className="w-4/5 grid grid-cols-2 gap-y-[24px]">
                    <div className="text-[#4D4D4D]">Город:</div>
                    <div className="text-[#252525] font-semibold flex flex-col">
                      {announcement.region}, {announcement.district}
                      <a href="#" className="text-[#1AA683] underline">
                        показать на карте
                      </a>
                    </div>

                    <div className="text-[#4D4D4D]">Тип жилья:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.typeOfHousing}
                    </div>

                    <div className="text-[#4D4D4D]">Этаж:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.numberOfFloor} из {announcement.maxFloorInTheBuilding}
                    </div>

                    <div className="text-[#4D4D4D]">Площадь:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.areaOfTheApartment} м²
                    </div>

                    <div className="text-[#4D4D4D]">Людей проживают:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.howManyPeopleLiveInThisApartment}
                    </div>

                    <div className="text-[#4D4D4D]">Людей ищут:</div>
                    <div className="text-[#252525] font-semibold">
                      {announcement.numberOfPeopleAreYouAccommodating}
                    </div>
                  </div>

                  <hr className="mt-[20px]" />
                </div>

                {/* Qualities */}
                <div className="col-span-3 mt-8">
                  <h2 className="font-circular text-[24px] font-semibold">
                    Качества
                  </h2>
                  <ul className="grid grid-cols-3 gap-4 mt-4">
                    {announcement.preferences?.map((quality, index) => (
                      <li
                        key={index}
                        className="text-[#252525] text=[16px] flex items-center space-x-2"
                      >
                        <Image.marked />
                        <span>{quality}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing and Contact Info */}
            <div className="col-span-2 h-full ">
              <div className="space-y-6 sticky top-6">
                {/* Price Section */}
                <div className="p-6  border rounded-lg space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[32px] font-semibold text-[#252525] leading-[45px]">
                      {announcement.cost} тг
                    </h2>
                    <span className="text-gray-500 text-[16px] leading-[20px]">
                      / месяц
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-gray-500 leading-[20px]">
                      Депозит:
                    </p>
                    <p className="text-[#252525] text-[16px] leading-[20px]">
                      {announcement.deposit} тг
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-gray-500 leading-[20px]">
                      Коммунальные услуги:
                    </p>
                    <p className="text-[#252525] text-[16px] leading-[20px]">
                      {announcement.minAmountOfCommunalService} - {announcement.maxAmountOfCommunalService} тг
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-gray-500 leading-[20px]">
                      Доступно с:
                    </p>
                    <p className="text-[#252525] text-[16px] leading-[20px]">
                      {announcement.arriveDate}
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="p-6 border rounded-lg space-y-4">
                  <p className="text-[14px] text-[#4D4D4D] leading-[20px]">
                    Вы можете связаться с сожителями и обсудить свои вопросы...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={announcement.user.profilePhoto || "/userSmall.png"}
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-[#252525] font-semibold">
                          {announcement.user.firstName} {announcement.user.lastName}
                        </p>
                        <p className="text-[14px] text-[#4D4D4D]">житель</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={`tel:${announcement.phoneNumber}`}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm text-[14px] font-semibold"
                      >
                        <Image.callIcon />
                        <span>Позвонить</span>
                      </a>
                      <a
                        href={`https://wa.me/${announcement.phoneNumber}`}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm  text-[14px] font-semibold"
                      >
                        <Image.whatsappIcon />
                        <span>Написать</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Interested People Section */}
                <div className="p-6 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <p className="text-[#4D4D4D] text-[14px] leading-[20px]">
                      Заинтересованы в объявлении:
                      <strong className="block text-[#252525] text-[16px] leading-[20px]">
                        {announcement.interestedPeopleCount || 0} человек
                      </strong>
                    </p>
                    <a
                      href="#"
                      className="text-[#1AA683] text-[14px] underline font-extrabold"
                    >
                      посмотреть группы
                    </a>
                  </div>

                  <p className="text-[#4D4D4D] text-[14px] text-center">
                    Понравилось помещение? <br />
                    Подайте заявку!
                  </p>

                  <button className="w-full py-3 bg-[#32343A] text-white text-[16px] font-semibold rounded-lg">
                    Подать заявку
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
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
              className="rounded-lg h-[900px] w-auto object-contain"
            />

            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-180"
              onClick={goToPreviousImage}
            >
              <img src="/right.svg" alt="previous" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={goToNextImage}
            >
              <img src="/right.svg" alt="next" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-8 text-white text-lg font-medium bg-black bg-opacity-60 px-3 py-1 rounded-md">
              {currentImageIndex + 1} / {announcement.photos.length}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AnnouncementPage;
