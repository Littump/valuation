import Cost from "../Cost/Cost.jsx";
import MapContainer from "../MapContainer/MapContainer.jsx";
import { SimilarBuildings } from "../SimilarBuildings/SimilarBuildings.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Analysis() {
  const buildingInfo = useSelector((state) => state.building.buildingInfo);

  if (
    buildingInfo.marketPrice === "" ||
    buildingInfo.marketPrice === null ||
    buildingInfo.marketPrice === undefined
  ) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-40 flex-col gap-4">
        <div className="text-4xl">Вы не ввели нужные данные </div>
        <Link to="/">На главную</Link>
      </div>
    );
  }

  return (
    <div className="py-10 flex flex-col gap-10">
      <Cost />
      <MapContainer />
      <SimilarBuildings />
    </div>
  );
}
