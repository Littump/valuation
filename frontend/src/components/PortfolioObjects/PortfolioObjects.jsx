import Object from "../UI/Object/Object.jsx";
import { useDispatch, useSelector } from "react-redux";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import PortfolioFilters from "./PortfolioFilters/PortfolioFilters.jsx";
import { getBuildingsHook } from "../../hooks/getBuildingsHook.js";
import Loading from "../UI/Loading/Loading.jsx";
import { useEffect } from "react";
import getHouseMaterialReversed from "../../functions/getHouseMaterialReversed.js";
import getObjectTypeReversed from "../../functions/getObjectTypeReversed.js";
import getRepairName from "../../functions/getRepairName.js";
import getParkingTypeReversed from "../../functions/getParkingTypeReversed.js";

export function PortfolioObjects() {
  const dispatch = useDispatch();
  const objects = useSelector((state) => state.myObjects.objects);
  const additionalFilter = useSelector(
    (state) => state.myObjects.additionalFilter
  );
  const { data, isLoading, isSuccess } = getBuildingsHook();
  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "myObjects/deleteObjects" });
      console.log(data)
      data.data.forEach((el) => {
        let real_price = parseFloat((el.real_price / 1000000).toFixed(1))
        let objectInfo = {
          house_material: getHouseMaterialReversed(el.house_material),
          object_type: getObjectTypeReversed(el.object_type),
          repair: getRepairName(el.repair[0], el.repair[2]),
          has_lift: !!el.has_lift,
          parking_type: getParkingTypeReversed(el.parking_type),
          address: el.address,
          floor: el.floor,
          cnt_rooms: el.cnt_rooms,
          floors: el.floors,
          area: el.area,
          coordinates: [el.latitude, el.longitude],
          isOpen: false,
          marketCost: el.price_buy/1000000,
          realCost:real_price,
          id: el.id,
          local_id: 1,
          liquidity: (real_price*1000000 / el.price_buy) >= 1.05 ? 'высокая' : (real_price / el.price_buy) <= 0.95 ? "низкая" : "средняя"
        };

        dispatch({ type: "myObjects/addObject", objectInfo: objectInfo });
      });
    }
  }, [data]);

  let objectsComponent = objects.map((info) => {
    if (additionalFilter.indexOf(info.liquidity) === -1) return <></>;
    return (
      <Object
        hasDelete={true}
        buildingInfo={info}
        key={info.address + info.id}
        name={"myObject" + info.id}
        openFunctionAction="myObjects/setIsOpen"
      />
    );
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      <MainHeading text="Ваши объекты" />
      <PortfolioFilters />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 w-full gap-8">{objectsComponent}</div>
      )}
    </div>
  );
}
