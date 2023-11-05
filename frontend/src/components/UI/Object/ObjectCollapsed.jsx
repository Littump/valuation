import MapWrapper from "../MapWrapper/MapWrapper";
import ObjectCollapsedInfo from "./ObjectCollapsedInfo";

export default function ObjectCollapsed({ buildingInfo }) {
  return (
    <div className="flex gap-5 md:h-72 w-full px-2 py-4 md:flex-row flex-col">
      <div className="md:w-1/2 w-full h-64 rounded-lg overflow-hidden border-2 border-blue-500 dark:border-none">
        <MapWrapper
          buildings={[{ center: buildingInfo.coordinates, id: -1 }]}
        />
      </div>
      <div className="md:w-1/2">
        <ObjectCollapsedInfo buildingInfo={buildingInfo} />
      </div>
    </div>
  );
}
