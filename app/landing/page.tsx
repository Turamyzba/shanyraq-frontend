"use client";
import Image from "next/image";
import { useState, useRef } from "react";

import * as Images from "../../public/images";
import WelcomeImage from "@/public/welcomeLanding.png";
import CtaImage from "@/public/cta.png";
import BenefitImage from "@/public/benefit.png";
import Header from "../components/header";
import Footer from "../components/footer";
import Search from "../components/search";
import Card from "../components/card";
import Accordion from "../components/accordion";
import AccordionList from "../components/accordion-list";

const LandingPage = () => {
  const [activeDesc, setActiveDesc] = useState(false);

  const toggleAccordion = () => setActiveDesc(!activeDesc);

  const cardData = [
    {
      id: 1,
      imageUrl: "room2.svg", // Example image path
      title: "Комфортная квартира",
      description: "Современная двухкомнатная квартира в центре города.",
      price: "150 000",
      city: "Москва",
      gender: "Любой",
      bedrooms: 2,
      people: 1,
      date: "28/11/2024", // Date formatted as DD/MM/YYYY
    },
    {
      id: 2,
      imageUrl: "room.svg", // Example image path
      title: "Уютный дом",
      description: "Просторный дом с садом и гаражом в тихом районе.",
      price: "130 000",
      city: "Санкт-Петербург",
      gender: "Мужчина",
      bedrooms: 4,
      people: 2,
      date: "20/11/2024", // Date formatted as DD/MM/YYYY
    },
    {
      id: 3,
      imageUrl: "main-building.svg", // Example image path
      title: "Студия в центре",
      description: "Маленькая, но уютная студия в самом центре города.",
      price: "210 000",
      city: "Новосибирск",
      gender: "Женщина",
      bedrooms: 1,
      people: 2,
      date: "15/11/2024", // Date formatted as DD/MM/YYYY
    },
    {
      id: 4,
      imageUrl: "room.svg", // Example image path
      title: "Квартира у моря",
      description: "Светлая квартира с видом на море, с парковкой и лифтом.",
      price: "250 000",
      city: "Сочи",
      gender: "Мужчина",
      bedrooms: 3,
      people: 4,
      date: "10/11/2024", // Date formatted as DD/MM/YYYY
    },
    {
      id: 5,
      imageUrl: "room2.svg", // Example image path
      title: "Комфортная квартира",
      description: "Современная двухкомнатная квартира в центре города.",
      price: "150 000",
      city: "Москва",
      gender: "Любой",
      bedrooms: 2,
      people: 1,
      date: "28/11/2024", // Date formatted as DD/MM/YYYY
    },
    {
      id: 6,
      imageUrl: "room.svg", // Example image path
      title: "Уютный дом",
      description: "Просторный дом с садом и гаражом в тихом районе.",
      price: "130 000",
      city: "Санкт-Петербург",
      gender: "Мужчина",
      bedrooms: 4,
      people: 2,
      date: "20/11/2024", // Date formatted as DD/MM/YYYY
    },
  ];

  const appAdvantages = [
    {
      id: 1,
      title: "Удобный поиск соседей",
      description:
        "Наше приложение позволяет быстро найти подходящих соседей, фильтруя по предпочтениям, местоположению и типу жилья, что экономит время и усилия.",
    },
    {
      id: 2,
      title: "Безопасность и проверка данных",
      description:
        "В Shanyraq мы уделяем особое внимание безопасности пользователей. Все аккаунты проходят верификацию, что гарантирует надежность информации и безопасность общения.",
    },
    {
      id: 3,
      title: "Интерактивная карта",
      description:
        "Интерактивная карта позволяет пользователям легко находить комнаты и квартиры в нужных районах города, а также оценивать близость к транспорту, магазинам и другим важным объектам.",
    },
    {
      id: 4,
      title: "Функция мгновенных уведомлений",
      description:
        "Получайте мгновенные уведомления о новых объявлениях, которые соответствуют вашим критериям поиска, чтобы не упустить лучшие варианты.",
    },
    {
      id: 5,
      title: "Отзывы и рейтинги",
      description:
        "Каждый пользователь может оставлять отзывы о своем опыте проживания, что помогает выбрать надежных и комфортных соседей, а также избежать неприятных ситуаций.",
    },
    {
      id: 6,
      title: "Простота в использовании",
      description:
        "Приложение имеет интуитивно понятный интерфейс, который позволяет пользователям легко размещать объявления, просматривать предложения и общаться с потенциальными соседями.",
    },
    {
      id: 7,
      title: "Поддержка разных форматов жилья",
      description:
        "Мы предлагаем не только квартиры, но и комнаты, койко-места, а также совместное проживание в различных типах жилья — от студий до многокомнатных квартир.",
    },
  ];
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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
      <Header />
      <div className="flex-grow w-[1300px] mx-auto mt-[50px]">
        <div
          className="relative w-full h-[560px]"
          style={{
            backgroundImage: `url(${WelcomeImage.src})`,
          }}>
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
                onClick={handlePrev}>
                <Images.left />
              </button>

              <button
                className="w-[40px] h-full flex items-center justify-center rounded-[5px] bg-[#32343A]"
                onClick={handleNext}>
                <Images.right />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto hide-scrollbar flex gap-[27px] py-[10px]">
            {cardData.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                isLast={cardData.length - 1 == index}
              />
            ))}
          </div>
        </div>

        <div className="w-full mt-[90px] flex items-center justify-between">
          <div
            className="relative w-full h-[500px] rounded-[20px]"
            style={{
              backgroundImage: `url(${CtaImage.src})`,
            }}>
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
                className="flex justify-center items-center gap-[5px] bg-[#FFFFFF] text-[#252525] font-bold px-[25px] py-[15px] rounded-[5px]">
                <span>Подать объявление</span>
                <Images.ArrowRight color={"#252525"} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full my-[90px] flex flex-col gap-[50px]">
          <h1 className="text-[36px] font-circular font-bold leading-[45px] text-left text-[#252525]">
            Наши примущества
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
