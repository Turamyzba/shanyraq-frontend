import { useState } from "react";
import Accordion from "./accordion";

const AccordionList: React.FC = () => {
  // State to track which accordion is open (null means no accordion is open)
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    // If the clicked accordion is already open, close it. Otherwise, open it.
    setActiveId((prev) => (prev === id ? null : id));
  };

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

  return (
    <div className="w-full flex justify-between max-h-[670px] overflow-y-auto custom-scrollbar mr-[50px]">
      <div className="max-w-[700px] max-h-full flex flex-col">
        {appAdvantages.map((data, index) => (
          <div key={data.id} className="flex group">
            <div
              className={`h-full w-[6px] border-none outline-none group-hover:bg-[#1AA683] ${
                activeId === data.id && "bg-[#1AA683]"
              } `}></div>
            <div className={`w-full ml-[70px] flex flex-col justify-between`}>
              <Accordion
                data={data}
                activeDesc={activeId === data.id} // Only this accordion will be active
                toggleAccordion={() => toggleAccordion(data.id)} // Toggle function for each accordion
              />
              {index !== appAdvantages.length - 1 && (
                <div
                  className={`w-full h-[2px] border-none outline-none bg-[#D6D6D6]`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionList;
