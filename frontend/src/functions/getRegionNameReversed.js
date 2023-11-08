export default function getRegionNameReversed(region) {
  let regions = {
    "Екатеринбург":"ekb",
    "Казань":"kzn" ,
    "Москва": "msc",
    "Нижний Новгород": "nng",
    "Новосибирск":"nsk" ,
    "Санкт-Петербург": "spb",
  };
  return regions[region];
}
