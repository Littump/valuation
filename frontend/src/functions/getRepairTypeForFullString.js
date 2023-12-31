export default function getRepairTypeForFullString(renovationType) {
  let repairConfig = {
    "С ремонтом и без мебели дизайнерский ремонт": "3;1",
    "С ремонтом и без мебели евроремонт": "2;1",
    "С ремонтом и без мебели косметический ремонт": "1;1",
    "С ремонтом и без мебели старый ремонт": "0;1",

    "С ремонтом и мебелью дизайнерский ремонт": "3;2",
    "С ремонтом и мебелью евроремонт": "2;2",
    "С ремонтом и мебелью косметический ремонт": "1;2",
    "С ремонтом и мебелью старый ремонт": "0;2",

    "Без ремонта предчистовая отделка": "2;0",
    "Без ремонта средняя отделка": "1;0",
    "Без ремонта черновая отделка": "0;0",
  };
  let repairType = repairConfig[renovationType];
  return repairType;
}
