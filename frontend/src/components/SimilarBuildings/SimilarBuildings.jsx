import { useSelector } from "react-redux";
import Object from "../UI/Object/Object.jsx";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import { PurpleButton } from "../UI/Button/Button.jsx";

export function SimilarBuildings() {
  let buildings = useSelector((state) => state.similarBuildings.buildings);
  let buildingsComponent = buildings.map((info) => (
    <Object
      key={info.id}
      address={info.address}
      id={info.id}
      cost={info.cost}
      liquidity={info.liquidity}
    />
  ));
  return (
    <div className="flex flex-col gap-6 transition-all">
      <div className=" text-center lg:text-start">
        <MainHeading>Похожие квартиры</MainHeading>
      </div>
      <div className="grid lg:flex lg:flex-col md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {buildingsComponent}
      </div>
      {/* <div className="flex justify-start">
                <PurpleButton><div className="px-4">Показать больше вариантов</div></PurpleButton>
            </div> */}
    </div>
  );
}
