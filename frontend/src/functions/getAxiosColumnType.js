export default function getAxiosColumnType(axiosType) {
  let axiosTypes = {
    "материал дома": "house_material",
    "тип квартиры": "object_type",
    ремонт: "repair",
    метро: "metro_name",
    регион: "region",
  };
  return axiosTypes[axiosType];
}
