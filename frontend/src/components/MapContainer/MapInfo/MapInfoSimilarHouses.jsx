import { useSelector } from "react-redux";
import MainHeading from "../../UI/MainHeading/MainHeading.jsx";

export default function MapInfoSimilarHouses() {
  let houses = useSelector((state) => state.similarBuildings.buildings);
  houses = houses.map((el) => el.address);
  return (
    <div className="flex flex-col items-center xs:items-start gap-4 scroll">
      <MainHeading>Информация о доме</MainHeading>
      <div className="max-h-72 overflow-y-scroll flex flex-col gap-4">
        {houses.map((el) => (
          <div className="flex gap-2" key={el}>
            <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
            <div className="text-black dark:text-dark-300">{el}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-4"></div>
    </div>
  );
}
