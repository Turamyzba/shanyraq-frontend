"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react"; // Добавили useEffect
import axiosInstance from "@/axiosInstance/axios"; // Импорт axiosInstance

import * as Images from "../../public/images";
import WelcomeImage from "@/public/welcomeLanding.png";
import CtaImage from "@/public/cta.png";
import BenefitImage from "@/public/benefit.png";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Search from "../../components/search";
import Card from "../../components/card";
import Accordion from "../../components/accordion";
import AccordionList from "../../components/accordion-list";
import Link from "next/link";

const LandingPage = () => {
  const [activeDesc, setActiveDesc] = useState(false);
  const [cardData, setCardData] = useState([]); // Изменили на состояние
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = () => setActiveDesc(!activeDesc);

  useEffect(() => {
    const fetchGreatDeals = async () => {
      try {
        const response = await axiosInstance.get("/announcement/great-deals");
        // Преобразуем данные из ответа в формат, ожидаемый компонентом Card
        const mappedData = response.data.map((item) => ({
          id: item.id,
          imageUrl:
            item.photos && item.photos.length > 0
              ? item.photos[0].url
              : "default-image.svg", // Используем первую фотографию или изображение по умолчанию
          title: item.title,
          description: item.apartmentsInfo,
          price: item.cost.toString(),
          city: item.region,
          gender: item.selectedGender,
          bedrooms: item.quantityOfRooms,
          people: item.numberOfPeopleAreYouAccommodating,
          date: item.arriveDate, // Форматировать дату при необходимости
        }));
        setCardData(mappedData);
      } catch (error) {
        console.error("Ошибка при получении выгодных предложений:", error);
      }
    };

    fetchGreatDeals();
  }, []);

  const appAdvantages = [
    // Ваши преимущества остаются без изменений
  ];

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header isFilterResults={false} />
      <div className="flex-grow w-[1300px] mx-auto mt-[50px]">
        <div
          className="relative w-full h-[560px]"
          style={{
            backgroundImage: `url(${WelcomeImage.src})`,
          }}
        >
          <div className="mx-auto relative z-10 pt-[70px] flex flex-col items-center text-white text-center w-[910px]">
            <h1 className="font-circular text-[48px] font-bold leading-[60px] tracking-[-0.4px] text-center underline-from-font decoration-none">
              Найди идеального сожителя!
            </h1>
            <p className="mt-[20px] text-center text-[18px] font-normal leading-[25px] tracking-normal">
              Маркетплейс для тех, кто ищет комфортное жилье и надежного соседа.
            </p>
            <Search />
          </div>
        </div>

        <div className="w-full mt-[90px] z-50 flex flex-col gap-[30px]">
          <div className="flex items-center justify-between">
            <h1 className="text-[36px] font-circular font-bold leading-[45px] text-left text-[#252525]">
              Выгодные предложения
            </h1>
            <div className="h-[40px] flex gap-[20px]">
              <button
                className="w-[40px] h-full flex items-center justify-center rounded-[5px] bg-[#D6D6D6]"
                onClick={handlePrev}
              >
                <Images.left />
              </button>

              <button
                className="w-[40px] h-full flex items-center justify-center rounded-[5px] bg-[#32343A]"
                onClick={handleNext}
              >
                <Images.right />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto hide-scrollbar flex gap-[27px] py-[10px]"
          >
            {cardData.map((card, index) => (
              <Link href={`/announcement/${card.id}`} key={card.id}>
                <Card card={card} isLast={cardData.length - 1 === index} />
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full mt-[90px] flex items-center justify-between">
          <div
            className="relative w-full h-[500px] rounded-[20px]"
            style={{
              backgroundImage: `url(${CtaImage.src})`,
            }}
          >
            <div className="mx-auto relative z-10 flex flex-col items-center justify-center text-white text-center h-full w-[910px] gap-[32px]">
              <div className="w-[360px] h-[5px] bg-white shadow-[0px_4px_10px_0px_#00000040]"></div>

              <h1 className="font-circular text-[48px] font-bold leading-[60px] tracking-[-0.4px] text-center underline-from-font decoration-none">
                Начните сдавать комнату сами!
              </h1>
              <p className="text-center text-[18px] font-normal leading-[25px]">
                На нашем сайте вы можете выставлять свои объявления
              </p>
              <button
                style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.2)" }}
                className="flex justify-center items-center gap-[5px] bg-[#FFFFFF] text-[#252525] font-bold px-[25px] py-[15px] rounded-[5px]"
              >
                <span>Подать объявление</span>
                <Images.ArrowRight color={"#252525"} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full my-[90px] flex flex-col gap-[50px]">
          <h1 className="text-[36px] font-circular font-bold leading-[45px] text-left text-[#252525]">
            Наши преимущества
          </h1>

          <div className="w-full flex justify-between items-center">
            <AccordionList />
            <div className="div">
              <img src={BenefitImage.src} alt="benefit" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
