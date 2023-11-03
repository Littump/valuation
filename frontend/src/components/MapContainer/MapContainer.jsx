import { useSelector } from "react-redux";
import MapButtons from "./MapButtons/MapButtons.jsx";
import MapComponent from "../MapComponent/MapComponent.jsx";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import Heading from "../UI/Heading/Heading.jsx";

export default function MapContainer() {
  let metro = useSelector((state) => state.maps.buildings.metro);
  let otherObjects = useSelector((state) => state.maps.buildings.otherObjects);
  return (
    <div className="w-full flex flex-col md:flex-row bg-light-gray py-6 sm:px-10 px-4 gap-8 md:gap-12 rounded-2xl dark:bg-dark-600">
      <div className="flex flex-col gap-6 lg:w-[40rem] md:w-[26rem]">
        <MapButtons />
        <div className="h-72 lg:w-[40rem] md:w-[26rem] border-2 border-blue-500 dark:border-none rounded-xl overflow-hidden">
          <MapComponent />
        </div>
      </div>
      <div className="flex flex-col gap-6 xs:text-start text-center">
        <MainHeading>Информация о доме</MainHeading>
        <div className="flex flex-col items-center xs:items-start gap-4">
          <Heading>Ближайшие станции метро:</Heading>
          {metro.map((el) => (
            <div key={el} className="flex gap-2">
              <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
              <div className="text-black dark:text-dark-300">{el}</div>
            </div>
          ))}
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
