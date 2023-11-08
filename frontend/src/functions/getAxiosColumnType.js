export default function getAxiosColumnType(axiosType) {
  let axiosTypes = {
    "материал дома": "house_material",
    "тип квартиры": "object_type",
    ремонт: "repair",
    метро: "metro_name",
    регион: "region",
    "кол-во комнат": "cnt_rooms",
    "тип парковки": "parking_type",
  };
  return axiosTypes[axiosType];
}
