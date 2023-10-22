export default function getHouseMaterial(parkingType) {
  if (parkingType === "") return "";
  let parkingTypes = {
    кирпичный: "brc",
    монолитный: "mnl",
    панельный: "pnl",
    блочный: "blc",
    деревянный: "wdn",
    сталинский: "stl",
    "кирпично-монолитный": "brm",
  };
  return parkingTypes[parkingType];
}
