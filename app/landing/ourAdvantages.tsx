import React from "react";
import BenefitImage from "@/public/benefit.png";
import AccordionList from "../../components/accordion-list";

const OurAdvantages = () => {
  return (
    <div className="w-full my-[60px] sm:my-[80px] md:my-[100px] flex flex-col gap-[40px] sm:gap-[50px] px-4 sm:px-0">
      <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-circular font-bold leading-tight text-left text-[#252525]">
        Наши преимущества
      </h1>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[40px] md:gap-[80px]">
        <div className="w-full md:w-1/2">
          <AccordionList />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={BenefitImage.src}
            alt="benefit"
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default OurAdvantages;
