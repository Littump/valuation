import MapButtons from "./MapButtons/MapButtons.jsx";
import MapComponent from "../MapComponent/MapComponent.jsx";
import MapInfoHouse from "./MapInfo/MapInfoHouse.jsx";
import MapInfoInfrastructure from "./MapInfo/MapInfoInfrastructure.jsx";
import { useSelector } from "react-redux";
import MapInfoSimilarHouses from "./MapInfo/MapInfoSimilarHouses.jsx";

export default function MapContainer() {
  let activeFilter = useSelector((state) => state.maps.activeFilter);
  let MapInfoObjects = {
    "Этот дом": <MapInfoHouse />,
    "Похожие квартиры": <MapInfoSimilarHouses />,
    Инфраструктура: <MapInfoInfrastructure />,
  };
  return (
    <div className="w-full flex flex-col md:flex-row bg-light-gray py-6 sm:px-10 px-4 gap-8 md:gap-12 rounded-2xl dark:bg-dark-600">
      <div className="flex flex-col gap-6 lg:w-[40rem] md:w-[26rem]">
        <MapButtons />
        <div className="h-72 lg:w-[40rem] md:w-[26rem] border-2 border-blue-500 dark:border-none rounded-xl overflow-hidden">
          <MapComponent />
        </div>
      </div>
      <div className="flex flex-col gap-6 :text-start">
        {MapInfoObjects[activeFilter]}
      </div>
    </div>
  );
}
