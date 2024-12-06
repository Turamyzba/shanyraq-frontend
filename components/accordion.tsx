import * as Images from "../public/images";

interface AccordionProps {
  data: {
    id: number;
    title: string;
    description: string;
  };
  activeDesc: boolean;
  toggleAccordion: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  data,
  activeDesc,
  toggleAccordion,
}) => {
  return (
    <div
      className={`accordion ${
        !activeDesc ? (data.id === 1 ? "mb-[40px]" : "my-[40px]") : "my-[0]"
      }`}>
      <div className="accordion-item overflow-hidden pt-[10px] pb-[20px]">
        <button
          className="accordion-header w-full text-left flex items-center gap-[12px]"
          onClick={toggleAccordion}>
          <span className="font-circular text-[20px] font-bold leading-[25px] tracking-[0.2px]">
            {data.title}
          </span>
          {activeDesc ? (
            <Images.arrowUp w={"20"} h={"20"} />
          ) : (
            <Images.arrowDown w={"20"} h={"20"} />
          )}
        </button>
        {activeDesc && (
          <div className="accordion-content">
            <p className="font-circular text-[16px] mt-[50px] font-medium leading-[20px] tracking-[0.2px] text-[#252525]">
              {data.description}
            </p>
            <a
              href="#"
              className="font-circular text-[16px] mt-[50px] font-medium leading-[20px] tracking-[0.2px] underline block">
              Узнать больше
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
