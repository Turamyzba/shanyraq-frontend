"use client";

import * as Images from "../../public/images";
import Card from "../../components/card";
import Link from "next/link";

interface OffersProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  cardData: any[];
}

const Offers = ({ scrollContainerRef, cardData }: OffersProps) => {
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
    <div className="w-full mt-[60px] sm:mt-[80px] md:mt-[90px] flex flex-col gap-[24px] sm:gap-[30px]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl md:text-[36px] font-circular font-bold leading-tight text-[#252525]">
          Выгодные предложения
        </h1>
        <div className="h-[40px] gap-[12px] hidden md:flex">
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
        className="w-full overflow-x-auto hide-scrollbar flex gap-[16px] sm:gap-[24px] py-[10px] scroll-smooth scroll-snap-x mandatory"
      >
        {cardData.map((card: any, index) => {
          const isLast = cardData.length - 1 === index;
          return isLast ? (
            <Card key={card.id} card={card} isLast={isLast} />
          ) : (
            <Link href={`/announcement/${card.id}`} key={card.id}>
              <Card card={card} isLast={isLast} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
