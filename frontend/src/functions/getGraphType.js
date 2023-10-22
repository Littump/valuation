export default function getGraphType(axiosType) {
  let axiosTypes = {
    цена: "price",
    площадь: "area",
    этаж: "floor",
    "количество комнат": "cnt_rooms",
  };
  return axiosTypes[axiosType];
}
