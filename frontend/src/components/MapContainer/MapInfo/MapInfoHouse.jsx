import { useSelector } from "react-redux";
import MainHeading from "../../UI/MainHeading/MainHeading.jsx";
import getRepairName from "../../../functions/getRepairName.js";

export default function MapInfoHouse() {
  let houseInfoResponse = useSelector(
    (state) => state.building.buildingInfoResponse
  );
  let houseInfo = useSelector((state) => state.building.buildingInfo);
  console.log(houseInfo);
  let responseElements = [
    { heading: "Газ", text: houseInfoResponse.gas },
    { heading: "Год", text: houseInfoResponse.year },
    { heading: "Горячая вода", text: houseInfoResponse.hot_water },
  ];
  let elements = [
    { heading: "Адрес", text: houseInfo.address },
    {
      heading: "Ремонт",
      text: getRepairName(
        parseInt(houseInfo.repair[0]),
        parseInt(houseInfo.repair[2])
      ).join(" "),
    },
    { heading: "Есть лифт", text: houseInfo.hasLift ? "да" : "нет" },
    { heading: "Площадь", text: houseInfo.square + "м²" },
    {
      heading: "Парковка",
      text:
        houseInfo.parkingType === "0" || houseInfo.parkingType === ""
          ? "нет"
          : houseInfo.parkingType,
    },
  ];
  return (
    <div className="flex flex-col items-center xs:items-start gap-6 scroll">
      <MainHeading>Информация о доме</MainHeading>
      <div className="max-h-72 overflow-y-scroll  flex flex-col gap-4">
        <div className="flex flex-col items-start gap-4">
          {elements.map((el) => {
            if (el.text === null) return null;
            return (
              <div className="flex gap-2" key={el.heading + el.text}>
                <div className="text-black font-semibold dark:text-dark-100">
                  {el.heading}
                </div>
                <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
                <div className="text-black dark:text-dark-300">{el.text}</div>
              </div>
            );
          })}
          {responseElements.map((el) => {
            if (el.text === null) return null;
            return (
              <div className="flex gap-2">
                <div className="text-black font-semibold dark:text-dark-200">
                  {el.heading}
                </div>
                <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
                <div className="text-black dark:text-dark-300">{el.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
