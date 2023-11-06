import normal from "../../../../public/imgs/iconNormal.png";
import low from "../../../../public/imgs/iconLow.png";
import high from "../../../../public/imgs/iconHigh.png";
import Heading from "../Heading/Heading.jsx";
import { Button } from "../Button/Button.jsx";
import { deleteBuildingHook } from "../../../hooks/deleteBuildingHook";
import ObjectCollapsed from "./ObjectCollapsed.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function Object({
  buildingInfo,
  hasDelete = true,
  name,
  openFunctionAction = "similarBuildings/setIsOpen",
}) {
  const dispatch = useDispatch();
  const { mutate } = deleteBuildingHook();
  let object_price = useSelector((state) => state.building.marketCost);
  let getLiquidityImg = (realCost, marketCost) => {
    if (realCost / marketCost >= 1.05) return low;
    else if (realCost / marketCost <= 0.95) return high;
    else return normal;
  };
  let getColor = (realCost, marketCost) => {
    if (realCost / marketCost >= 1.05) return "red";
    else if (realCost / marketCost <= 0.95) return "green";
    else return "blue-500";
  };
  return (
    <div
      className={
        " collapse collapse-arrow bg-light-gray rounded-xl dark:bg-dark-600 md:pr-6 " +
        (buildingInfo.isOpen ? "collapse-open" : "")
      }
      name={name}
    >
      <div
        className="collapse-title text-xl font-medium flex flex-col md:flex-row md:items-center justify-start py-3 gap-1 sm:pl-6 "
        onClick={() =>
          dispatch({ type: openFunctionAction, id: buildingInfo.id })
        }
      >
        {!hasDelete ? (
          <></>
        ) : (
          <img
            src={getLiquidityImg(
              buildingInfo?.realCost,
              buildingInfo?.marketCost
            )}
            alt=""
            className="hidden md:block"
          />
        )}

        <div className="flex flex-col text-start items-start md:ml-2 max-w-3xl">
          <span className="text-sm dark:text-dark-100">
            ID: {buildingInfo.id}
          </span>
          <Heading>{buildingInfo.address}</Heading>
        </div>
        <div className="flex md:ml-auto">
          {!hasDelete ? (
            <div className="flex flex-col mr-6">
              <span className="text-sm text-dark-gray-400 dark:text-dark-200">
                Рыночная цена
              </span>
              <span
                className={
                  " text-xl font-bold lg:ml-auto mr-2 " +
                  "text-" +
                  (buildingInfo.price / object_price >= 1.05
                    ? "red"
                    : buildingInfo.price / object_price <= 0.95
                    ? "green"
                    : "blue-500")
                }
              >
                {buildingInfo.price + " млн Р"}
              </span>
            </div>
          ) : (
            <>
              <div className="flex flex-col mr-6">
                <span className="text-xs max-w-[100px] text-dark-gray-400 dark:text-dark-200">
                  Вероятный рост цены (за полгода)
                </span>
                <span
                  className={`text-sm font-bold lg:ml-auto mr-2 ${
                    buildingInfo.realCost >= 5
                      ? "text-green"
                      : buildingInfo.realCost <= -5
                      ? "text-red"
                      : "text-blue-500"
                  }`}
                >
                  {buildingInfo.realCost + " %"}
                </span>
              </div>
              <div className="flex flex-col mr-6">
                <span className="text-xs text-dark-gray-400 dark:text-dark-200">
                  Цена покупки
                </span>
                <span className="text-red text-sm font-bold lg:ml-auto mr-2 ">
                  {buildingInfo.realCost + " млн Р"}
                </span>
              </div>
              <div className="flex flex-col mr-6">
                <span className="text-xs text-dark-gray-400 dark:text-dark-200">
                  Рыночная цена
                </span>
                <span
                  className={
                    " text-sm font-bold lg:ml-auto mr-2 " +
                    "text-" +
                    (hasDelete
                      ? "green"
                      : getColor(
                          buildingInfo.realCost,
                          buildingInfo.marketCost
                        ))
                  }
                >
                  {buildingInfo.marketCost + " млн Р"}
                </span>
              </div>
            </>
          )}
        </div>

        {hasDelete ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Вы действительно хотите удалить этот объект")) {
                mutate(buildingInfo.id);
                dispatch({
                  type: "myObjects/deleteObject",
                  id: buildingInfo.id,
                });
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-4 hidden lg:block dark:text-dark-200 transition hover:text-blue-500 dark:hover:text-dark-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            <div className="lg:hidden block">
              <Button>удалить</Button>
            </div>
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="collapse-content">
        <ObjectCollapsed buildingInfo={buildingInfo} />
      </div>
    </div>
  );
}
