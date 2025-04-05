"use client";
import { useState, useRef, useEffect } from "react"; // Добавили useEffect
import axiosInstance from "@/axiosInstance/axios"; // Импорт axiosInstance
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import SecondBanner from "./secondBanner";
import FirstBanner from "./firstBanner";
import Offers from "./offers";
import OurAdvantages from "./ourAdvantages";
const LandingPage = () => {
  const [activeDesc, setActiveDesc] = useState(false);
  const [cardData, setCardData] = useState([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const toggleAccordion = () => setActiveDesc(!activeDesc);

  useEffect(() => {
    const fetchGreatDeals = async () => {
      try {
        const response = await axiosInstance.get("/announcement/great-deals");
        // Преобразуем данные из ответа в формат, ожидаемый компонентом Card
        const mappedData = response.data.map((item: any) => ({
          id: item.announcementId,
          image: item.image,
          title: item.title,
          cost: item.cost,
          address: item.address,
          selectedGender: item.selectedGender,
          roomCount: item.roomCount,
          roommates: item.roommates,
          arriveDate: item.arriveDate, // Форматировать дату при необходимости
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

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header isFilterResults={false} />
      <div className="flex-grow w-full max-w-screen-xl mx-auto mt-12 px-4">
        <FirstBanner />
        <Offers scrollContainerRef={scrollContainerRef} cardData={cardData} />
        <SecondBanner />
        <OurAdvantages />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
