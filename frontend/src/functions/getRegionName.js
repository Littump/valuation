export default function getRegionName(region) {
  let regions = {
    ekb: "Екатеринбург",
    kzn: "Казань",
    msc: "Москва",
    nng: "Нижний Новгород",
    nsk: "Новосибирск",
    spb: "Санкт-Петербург",
  };
  return regions[region];
}
