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
    local_id: el.local_id,
  }));

  const infrastructure = useSelector((state) => state.building.infrastructure);
  const infrastructurePositions = [];

  for (var key1 in infrastructure) {
    if (infrastructure[key1].count !== 0) {
      infrastructure[key1].items.forEach((el) => {
        infrastructurePositions.push({ center: el.point, id: -2 });
      });
    }
  }
  return (
    <div className="w-full h-full">
      <MapWrapper
        buildings={
          activeFilter === "Похожие дома"
            ? similarBuildingsPositions
            : activeFilter === "Этот дом"
            ? [{ center: houseCoordinates, id: -1 }]
            : infrastructurePositions
        }
        zoom={
          activeFilter === "Похожие дома"
            ? 11
            : activeFilter === "Этот дом"
            ? 16
            : 14
        }
        isMarksLink={activeFilter === "Похожие дома" ? true : false}
      />
    </div>
  );
}
