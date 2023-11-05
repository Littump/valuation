export default function getHouseMaterialReversed(material) {
  let materials = {
    brc: "кирпичный",
    mnl: "монолитный",
    pnl: "панельный",
    blc: "блочный",
    wdn: "деревянный",
    stl: "сталинский",
    brm: "кирпично-монолитный",
  };
  return materials[material];
}
