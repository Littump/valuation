export default function getHouseMaterial(material) {
  if (material === "") return "mnl";
  let materials = {
    кирпичный: "brc",
    монолитный: "mnl",
    панельный: "pnl",
    блочный: "blc",
    деревянный: "wdn",
    сталинский: "stl",
    "кирпично-монолитный": "brm",
  };
  return materials[material];
}
