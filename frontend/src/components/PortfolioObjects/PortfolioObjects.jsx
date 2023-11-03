import Object from "../UI/Object/Object.jsx";
import { useDispatch, useSelector } from "react-redux";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import PortfolioFilters from "./PortfolioFilters/PortfolioFilters.jsx";
import { getBuildingsHook } from "../../hooks/getBuildingsHook.js";
import Loading from "../UI/Loading/Loading.jsx";
import { useEffect } from "react";

export function PortfolioObjects() {
  const dispatch = useDispatch();
  const objects = useSelector((state) => state.myObjects.objects);
  const mainFilter = useSelector((state) => state.myObjects.mainFilter);
  const additionalFilter = useSelector(
    (state) => state.myObjects.additionalFilter
  );
  const { data, isLoading, isSuccess } = getBuildingsHook();
  useEffect(() => {
    if (isSuccess) {
      data.data.forEach((el) => {
        dispatch({ type: "myObjects/addObject", buildingInfo: el });
      });
    }
  }, [data]);
  let objectsComponent = objects.map((object) =>
    additionalFilter.indexOf(object.liquidity) !== -1 &&
    (mainFilter === "" || mainFilter === "Объекты с риском") ? (
      <Object buildingInfo={object} />
    ) : (
      ""
    )
  );

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
