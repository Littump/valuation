export default function getAxiosType(axiosType) {
  let axiosTypes = {
    цена: "price",
    площадь: "area",
    этаж: "floor",
    "количество комнат": "cnt_rooms",
    "всего этажей": "floors",
    год: "house_year",
    "время до метро": "metro_min",
  };
  return axiosTypes[axiosType];
}
