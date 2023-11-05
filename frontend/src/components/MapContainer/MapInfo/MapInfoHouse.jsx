import { useSelector } from "react-redux";
import MainHeading from "../../UI/MainHeading/MainHeading.jsx";

export default function MapInfoHouse() {
  let houseInfo = useSelector((state) => state.building.buildingInfoResponse);
  let elements = [
    { heading: "Газ", text: houseInfo.gas },
    { heading: "Год", text: houseInfo.year },
    { heading: "Горячая вода", text: houseInfo.hot_water },
  ];
  return (
    <>
      <MainHeading>Информация о доме</MainHeading>
      <div className="flex flex-col items-start gap-4">
        {elements.map((el) => {
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
    </>
  );
}
