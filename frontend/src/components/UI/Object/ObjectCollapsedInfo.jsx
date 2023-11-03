import { useSelector } from "react-redux";
import Heading from "../Heading/Heading";

export default function ObjectCollapsedInfo({ buildingInfo }) {
  let metro = useSelector((state) => state.maps.buildings.metro);
  let otherObjects = useSelector((state) => state.maps.buildings.otherObjects);
  return (
    <div className="flex flex-col gap-5">
      <Heading>{buildingInfo.address}</Heading>
      <div className="flex flex-col items-center xs:items-start gap-10">
        <div>
          <Heading>Ближайшие станции метро:</Heading>
          {metro.map((el) => (
            <div key={el} className="flex gap-2">
              <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
              <div className="text-black dark:text-dark-300">{el}</div>
            </div>
          ))}
        </div>
        <div>
          <Heading>Ближайшие объекты:</Heading>
          {otherObjects.map((el) => (
            <div key={el} className="flex gap-2">
              <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
              <div className="text-black dark:text-dark-300">{el}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
