import { useSelector } from "react-redux";
import MainHeading from "../../UI/MainHeading/MainHeading.jsx";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";

export default function MapInfoInfrastructure() {
  const infrastructure = useSelector((state) => state.building.infrastructure);
  const infrastructureKeys = Object.keys(infrastructure);
  const colors = [
    "text-mark-red",
    "text-mark-blue",
    "text-mark-orange",
    "text-mark-yellow",
    "text-mark-green",
    "text-mark-purple",
    "text-mark-violet",
    "text-mark-brown",
    "text-mark-pink",
  ];
  let i = -1;
  const infrastructureObjects = infrastructureKeys.map((key) => {
    i += 1;
    if (infrastructure[key].count === 0) return null;
    return (
      <div key={infrastructure[key].items[0].name}>
        <span className={`text-md font-bold ${colors[i]}`}>{key}</span>
        {infrastructure[key]?.items
          .map((item) => {
            return (
              <div className="flex gap-2" key={item.name + "1"}>
                <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
                <div className="text-black dark:text-dark-300">
                  {item?.name}
                </div>
              </div>
            );
          })
          .slice(0, 2)}
      </div>
    );
  });
  return (
    <>
      <MainHeading>Информация о доме</MainHeading>
      <div className="flex flex-col items-center xs:items-start gap-4 scroll">
        <div className="max-h-72 overflow-y-scroll  flex flex-col gap-4">
          {infrastructureObjects}
        </div>
      </div>
    </>
  );
}
