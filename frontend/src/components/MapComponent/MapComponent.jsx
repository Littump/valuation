import { useSelector } from "react-redux";
import MapWrapper from "../UI/MapWrapper/MapWrapper.jsx";

export default function MapComponent() {
  let activeFilter = useSelector((state) => state.maps.activeFilter);
  let houseCoordinates = useSelector(
    (state) => state.building.coordinates //coordinates
  );
  let similarBuildings = useSelector(
    (state) => state.similarBuildings.buildings
  );
  let similarBuildingsPositions = similarBuildings.map((el) => ({
    center: el.coordinates,
    id: el.id,
  }));
  return (
    <div className="w-full h-full">
      <MapWrapper
        buildings={
          activeFilter === "Похожие дома"
            ? similarBuildingsPositions
            : [{ center: houseCoordinates, id: -1 }]
        }
        isMarksLink={activeFilter === "Похожие дома" ? true : false}
      />
    </div>
  );
}
