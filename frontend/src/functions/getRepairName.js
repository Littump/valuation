export default function getRepairName(num1, num2) {
  let repairQualdata = [
    [
      ["Без ремонта", "предчистовая отделка"],
      ["Без ремонта", "средняя отделка"],
      ["Без ремонта", "черновая отделка"],
    ],
    [
      ["С ремонтом и без мебели", "дизайнерский ремонт"],
      ["С ремонтом и без мебели", "евроремонт"],
      ["С ремонтом и без мебели", "косметический ремонт"],
      ["С ремонтом и без мебели", "старый ремонт"],
    ],
    [
      ["С ремонтом и мебелью", "дизайнерский ремонт"],
      ["С ремонтом и мебелью", "евроремонт"],
      ["С ремонтом и мебелью", "косметический ремонт"],
      ["С ремонтом и мебелью", "старый ремонт"],
    ],
  ];

  return repairQualdata[num1][num2];
}