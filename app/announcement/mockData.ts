export const mockData = {
  id: 123,
  title: "Уютная квартира в центре",
  apartmentsInfo:
    "Светлая и просторная квартира, рядом множество магазинов, кафе и сквер. Ищем дружелюбного сожителя!",
  cost: 120000,
  deposit: 50000,
  minAmountOfCommunalService: 5000,
  maxAmountOfCommunalService: 10000,
  arriveDate: "2025-04-01",
  typeOfHousing: "Квартира",
  quantityOfRooms: 3,
  areaOfTheApartment: 75,
  numberOfFloor: 2,
  maxFloorInTheBuilding: 9,
  howManyPeopleLiveInThisApartment: 2,
  numberOfPeopleAreYouAccommodating: 1,
  region: "Алматы",
  district: "Бостандыкский район",
  microDistrict: "Самал-2",
  // The code references `announcement.preferences`
  preferences: ["Чистоплотность", "Без животных", "Не курю"],
  photos: [
    { id: 1, url: "/picturas/kva1.jpg" },
    { id: 2, url: "/picturas/kva2.jpg" },
    { id: 3, url: "/picturas/kva3.jpg" },
    { id: 4, url: "/picturas/kva4.jpg" },
    { id: 5, url: "/picturas/kva5.jpg" },
    { id: 6, url: "/picturas/kva6.jpg" },
  ],
  user: {
    firstName: "Александр",
    lastName: "Константинополовичь",
    profilePhoto: null, // or "/userSmall.png" if you want a default
  },
  phoneNumber: "77010000000", // your code references `announcement.phoneNumber`
};
