"use client";
import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import * as Image from "../../public/images";
import { url } from "inspector";

const AnnouncementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/main-building.svg",
    "/room.svg",
    "/room2.svg",
    "/room.svg",
    "/room2.svg",
  ];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate through images
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex justify-center my-[30px]">
        <div className="w-full max-w-[1300px]">
          {/* Top Section with Images */}
          <div className="grid grid-cols-4 gap-4">
            {/* Main Image (Left: 2/3 of the width) */}
            <div className="col-span-2" onClick={() => openModal(0)}>
              <img
                src="/main-building.svg"
                alt="Main Building"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Smaller Images (Right: 1/3 of the width, stacked in 2 rows) */}
            <div className="col-span-2">
              <div className="grid grid-rows-2 grid-cols-2 gap-4 h-[500px]">
                <img
                  src="/room.svg"
                  alt="Room 1"
                  className="rounded-lg w-full h-full object-cover"
                />
                <img
                  src="/room.svg"
                  alt="Room 2"
                  className="rounded-lg w-full h-full object-cover"
                />
                <img
                  src="/room2.svg"
                  alt="Room 3"
                  className="rounded-lg w-full h-full object-cover"
                />
                <div className="relative">
                  <img
                    src="/room2.svg"
                    alt="Room 4"
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-semibold rounded-lg">
                    Показать все фото
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Title and Description */}
          <div className="grid grid-cols-5 gap-8 my-8">
            <div className="col-span-3 space-y-6">
              <h1 className="font-circular text-[36px] font-semibold">
                Алтын ауыл дом 3, кв 15
              </h1>
              <div className="flex items-center text-gray-600 space-x-[10px]">
                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.roomCount />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    3 комнат
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.apartmentArea />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    50 м²
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.apartmentType />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    квартира
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg bg-white shadow-sm">
                  <Image.maxPeople />
                  <span className="text-[#252525] text-[16px] font-semibold">
                    5 максимум
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
                      Светлая, уютная 3 комнатная квартира студия в кирпичном
                      доме! <br /> <br /> В шаговой доступности
                      Общеобразовательная школа №3! Пассивный доход 150 000 тг!
                      ИДЕАЛЬНЫЙ ВАРИАНТ МОЛОДЫМ ЛЮДЯМ. ТЕПЛАЯ И УЮТНАЯ КВАРТИРА!
                      <br /> <br /> Двор облагорожен детскими и спортивными
                      площадками. Возле школы большие баскетбольные и футбольные
                      поля.
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
                      Каскелен, Акмолинская область
                      <a href="#" className="text-[#1AA683] underline">
                        показать на карте
                      </a>
                    </div>

                    <div className="text-[#4D4D4D]">Тип дома:</div>
                    <div className="text-[#252525] font-semibold">
                      кирпичный
                    </div>

                    <div className="text-[#4D4D4D]">Жилой комплекс:</div>
                    <div className="text-[#252525] font-semibold">
                      Алтын Ауыл
                    </div>

                    <div className="text-[#4D4D4D]">Год постройки:</div>
                    <div className="text-[#252525] font-semibold">2016</div>

                    <div className="text-[#4D4D4D]">Этаж:</div>
                    <div className="text-[#252525] font-semibold">3 из 5</div>

                    <div className="text-[#4D4D4D]">Площадь:</div>
                    <div className="text-[#252525] font-semibold">50 м²</div>

                    <div className="text-[#4D4D4D]">Состояние:</div>
                    <div className="text-[#252525] font-semibold">
                      свежий ремонт
                    </div>

                    <div className="text-[#4D4D4D]">Людей проживают:</div>
                    <div className="text-[#252525] font-semibold">3</div>

                    <div className="text-[#4D4D4D]">Людей ищут:</div>
                    <div className="text-[#252525] font-semibold">12</div>
                  </div>

                  <hr className="mt-[20px]" />
                </div>

                {/* Qualities */}
                <div className="col-span-3 mt-8">
                  <h2 className="font-circular text-[24px] font-semibold">
                    Качества
                  </h2>
                  <ul className="grid grid-cols-3 gap-4 mt-4">
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Платежеспособный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Чистоплотный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Ответственный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Добросовестный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Порядочный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Неконфликтный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Религиозный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Аккуратный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Пунктуальный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Внимательный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Честный</span>
                    </li>
                    <li className="text-[#252525] text=[16px] flex items-center space-x-2">
                      <Image.marked />
                      <span>Надежный</span>
                    </li>
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
                      150 000 тг
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
                      20 000 тг
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-gray-500 leading-[20px]">
                      Коммунальные услуги:
                    </p>
                    <p className="text-[#252525] text-[16px] leading-[20px]">
                      5 000 - 10 000 тг
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[16px] text-gray-500 leading-[20px]">
                      Доступно с 1 января:
                    </p>
                    <Image.calendar />
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
                        src="/userSmall.png"
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-[#252525] font-semibold">
                          Алия Жакупова
                        </p>
                        <p className="text-[14px] text-[#4D4D4D]">житель</p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm text-[14px] font-semibold">
                        <Image.callIcon />
                        <span>Позвонить</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm  text-[14px] font-semibold">
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
                        5 человек
                      </strong>
                    </p>
                    <a
                      href="#"
                      className="text-[#1AA683] text-[14px] underline font-extrabold">
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
            onClick={closeModal}>
            &times;
          </button>

          <div className="relative flex flex-col items-center">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="rounded-lg h-[900px] w-auto object-contain"
            />

            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-180"
              onClick={goToPreviousImage}>
              <img src="/right.svg" alt="right" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={goToNextImage}>
              <img src="/right.svg" alt="right" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-8 text-white text-lg font-medium bg-black bg-opacity-60 px-3 py-1 rounded-md">
              {currentImageIndex + 1} / {images.length}
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
