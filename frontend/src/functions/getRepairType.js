export default function getRepairType(renovationTypeX, renovationTypeY) {
  let repairConfig = {
    "С ремонтом и без мебели": {
      "дизайнерский ремонт": "3;1",
      евроремонт: "2;2",
      "косметический ремонт": "1;1",
      "старый ремонт": "0;1",
    },
    "С ремонтом и мебелью": {
      "дизайнерский ремонт": "3;2",
      евроремонт: "2;2",
      "косметический ремонт": "1;2",
      "старый ремонт": "0;2",
    },
    "Без ремонта": {
      "предчистовая отделка": "2;0",
      "средняя отделка": "1;0",
      "черновая отделка": "0;0",
    },
  };
  let repairType = repairConfig[renovationTypeX][renovationTypeY];
  return repairType;
}
