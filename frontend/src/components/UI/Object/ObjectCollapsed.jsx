import MapWrapper from "../MapWrapper/MapWrapper";
import ObjectCollapsedInfo from "./ObjectCollapsedInfo";

export default function ObjectCollapsed({ buildingInfo }) {
  return (
    <div className="flex gap-5 h-72 w-full px-2 py-4">
      <div className="w-1/2 rounded-lg overflow-hidden border-2 border-blue-500 dark:border-none">
        <MapWrapper buildings={[{ center: [59.97084, 30.38574], id: -1 }]} />
      </div>
      <div className="w-1/2">
        <ObjectCollapsedInfo buildingInfo={buildingInfo} />
      </div>
    </div>
  );
}
