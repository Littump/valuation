import { useSelector } from "react-redux";
import Object from "../UI/Object/Object.jsx";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";

export function SimilarBuildings() {
  let buildings = useSelector((state) => state.similarBuildings.buildings);
  let buildingsComponent = buildings.map((info) => (
    <Object
      hasDelete={false}
      buildingInfo={info}
      key={info.address + info.id}
      name={"similarObject" + (info.id - 1)}
    />
  ));
  return (
    <div className="flex flex-col gap-6 transition-all">
      <div className=" text-center lg:text-start">
        <MainHeading>Похожие квартиры</MainHeading>
      </div>
      <div className="flex flex-col gap-4">{buildingsComponent}</div>
    </div>
  );
}
