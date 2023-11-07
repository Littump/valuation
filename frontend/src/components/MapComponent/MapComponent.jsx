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
  const infrastructurePositions = new Set();
  const colors = [
    "red",
    "blue",
    "orange",
    "yellow",
    "green",
    "purple",
    "violet",
    "brown",
    "pink",
  ];

  let j = 0;
  let i = 0;
  for (var key1 in infrastructure) {
    if (infrastructure[key1].count !== 0) {
      infrastructure[key1].items.forEach((el) => {
        infrastructurePositions.add({
          center: el.point,
          id: j,
          color: colors[i],
        });
        j++;
      });
    }
    i++
  }
  return (
    <div className="w-full h-full">
      <MapWrapper
        buildings={
          activeFilter === "Похожие квартиры"
            ? similarBuildingsPositions
            : activeFilter === "Этот дом"
            ? [{ center: houseCoordinates, id: -1 }]
            : [...infrastructurePositions]
        }
        zoom={
          activeFilter === "Похожие квартиры"
            ? 11
            : activeFilter === "Этот дом"
            ? 16
            : 14
        }
        isMarksLink={activeFilter === "Похожие квартиры" ? true : false}
        isDifferentColors={activeFilter === "Инфраструктура" ? true : false}
      />
    </div>
  );
}
