import DropComponent from "./DropComponent/DropComponent.jsx";
import { useState } from "react";
import TextComponent from "./TextComponent/TextComponent.jsx";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";
import { PurpleButton } from "../../UI/Button/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import renovation from "../../../../public/imgs/renovation.svg";
import { getRenovationTypeHook } from "../../../hooks/getRenovationTypeHook.js";
import Loading from "../../UI/Loading/Loading.jsx";

export default function RenovationFilters({ values, setIsDrop }) {
  let dispatch = useDispatch();
  let renovationTypeX = useSelector(
    (state) => state.renovation.renovationTypeX
  );
  let renovationTypeY = useSelector(
    (state) => state.renovation.renovationTypeY
  );
  let renovationImages = useSelector((state) => state.renovation.images);
  let mutation = getRenovationTypeHook();
  return (
    <div className="lg:pl-12 lg:w-full xs:w-10/12 w-11/12 lg:text-start">
      <div className="h-full gap-4 grid">
        <div className="text-center lg:text-start">
          <LightHeading>Данные о типе отделки и ремонте</LightHeading>
        </div>
        <div className="flex xs:flex-row flex-col mx-auto lg:mx-0 gap-1 bg-white text-center sm:text-start w-fit p-1 rounded-lg border-gray dark:bg-dark-600 text-black dark:text-dark-200">
          <div
            className={
              "h-full rounded-lg py-2 px-3 transition cursor-pointer " +
              (values.isDrop &&
                "bg-blue-400 text-white dark:bg-dark-500 dark:text-dark-100")
            }
            onClick={() => setIsDrop("isDrop", true)}
          >
            Подобрать автоматически
          </div>
          <div
            className={
              "h-full rounded-lg py-2 px-3 transition cursor-pointer " +
              (!values.isDrop &&
                "bg-blue-400 text-white dark:bg-dark-500 dark:text-dark-100")
            }
            onClick={() => setIsDrop("isDrop", false)}
          >
            Ручной ввод
          </div>
        </div>
        {values.isDrop ? <DropComponent /> : <TextComponent values={values} />}
        {!values.isDrop ? (
          <></>
        ) : (
          <PurpleButton variant="normal">
            <button
              type="button"
              className="w-full h-full text-center"
              onClick={() => {
                if (values.renovationType !== "") {
                  dispatch({
                    type: "renovation/setRenovationType",
                    renovationTypeX: values.renovationType,
                    renovationTypeY: values.renovationTypePicked,
                  });
                } else if (renovationImages.length !== 0) {
                  mutation.mutate();
                } else {
                  alert("Добавьте фотографии или выберите один из вариантов");
                }
              }}
            >
              {mutation.isLoading ? <Loading /> : "Определить тип"}
            </button>
          </PurpleButton>
        )}
        {!values.isDrop ? (
          <></>
        ) : renovationTypeY == "" ? null : (
          <div className="text-black max-w-lg md:max-w-3xl border border-blue-500 w-full flex gap-1 px-4 sm:px-0 sm:gap-4 justify-center items-center py-3 rounded-lg font-semibold dark:bg-dark-600 dark:text-dark-100 dark:border-dark-700">
            <img src={renovation} alt="" className="fill-dark-300" />
            {renovationTypeX === undefined || renovationTypeY === undefined
              ? "не удалось определить"
              : renovationTypeX + " " + renovationTypeY}
          </div>
        )}
      </div>
    </div>
  );
}
