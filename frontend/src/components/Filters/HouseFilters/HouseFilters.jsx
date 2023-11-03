import { Field } from "formik";
import HouseTags from "./HouseTags.jsx";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";
import DropdownMenu from "../../UI/DropdownMenu/DropdownMenu.jsx";
import { Tag } from "../../UI/Button/Button.jsx";
import {
  flatTypes,
  houseTypes,
  parkingTypes,
} from "../../../config/houseFilters.js";

export default function HouseFilters({ values, errors, touched }) {
  return (
    <div className="flex flex-col gap-4 w-8/12 xs:w-11/12 sm:w-auto text-center sm:text-start">
      <div className="flex gap-4 xl:gap-6 flex-col sm:flex-row">
        <div className="flex flex-col gap-4">
          <LightHeading>Данные о доме</LightHeading>
          <Field
            name="address"
            placeholder="Введите адрес"
            className={
              "myInput " +
              (errors.address && touched.address
                ? "border border-red dark:border-red"
                : "")
            }
          />
          <LightHeading>Основные данные о квартире</LightHeading>
          <Field
            name="discription"
            as="textarea"
            rows="4"
            placeholder={
              errors.description && touched.description
                ? "Обязательное поле"
                : "Текстовое описание квартиры"
            }
            className={
              "myInput resize-none" +
              (errors.description && touched.description
                ? " border border-red dark:border-red"
                : "")
            }
          />
          <div className="flex gap-4">
            <Field
              name="floor"
              type="number"
              placeholder="Этаж"
              className={
                "myInput w-4/12 number" +
                (errors.floor && touched.floor
                  ? " border border-red dark:border-red"
                  : "")
              }
              size="3"
              max="100"
            />
            <Field
              name="square"
              type="number"
              placeholder="Площадь м2"
              className={
                "myInput w-36 number" +
                (errors.square && touched.square
                  ? " border border-red dark:border-red"
                  : "")
              }
              size="3"
              max="500"
            />
          </div>
        </div>
        <div className="w-full sm:w-fit">
          <div className="flex sm:flex-col justify-between sm:justify-start gap-4 mt-10 w-full">
            <div className="relative w-44 sm:w-auto text-start">
              <div
                className={
                  "absolute -top-7 left-4 font-semibold text-sm dark:text-dark-100" +
                  (errors.houseType && touched.houseType
                    ? "text-red dark:text-red"
                    : "")
                }
              >
                {errors.houseType && touched.houseType
                  ? "обязательное поле"
                  : "Тип дома"}
              </div>
              <DropdownMenu
                name={"houseType"}
                value={values.houseType}
                options={houseTypes}
                error={errors.houseType && touched.houseType}
              />
            </div>
            <div className="relative w-44 sm:w-auto text-start sm:mt-9">
              <div
                className={
                  "absolute -top-7 left-4 font-semibold text-sm dark:text-dark-100" +
                  (errors.flatType && touched.flatType
                    ? "text-red dark:text-red"
                    : "")
                }
              >
                {errors.flatType && touched.flatType
                  ? "обязательное поле"
                  : "Тип квартиры"}
              </div>
              <DropdownMenu
                name={"flatType"}
                value={values.flatType}
                options={flatTypes}
                error={errors.flatType && touched.flatType}
              />
            </div>
          </div>
          <div className="mt-5 flex ">
            <Field
              name="roomsNumber"
              type="number"
              placeholder="Кол-во комнат"
              className={
                "myInput number w-44 sm:w-fit" +
                (errors.roomsNumber && touched.roomsNumber
                  ? " border border-red dark:border-red"
                  : "")
              }
              size="3"
              max="1000"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <LightHeading>Инфраструктура</LightHeading>
        <div
          role="group"
          aria-labelledby="my-radio-group"
          className="grid xs:grid-cols-2 sm:flex sm:flex-wrap gap-4 mt-4"
        >
          <label className="w-full sm:w-auto">
            <Field name="hasLift" type="checkbox" className="hidden" />
            <Tag active={values.hasLift}>В доме есть лифт</Tag>
          </label>
          <HouseTags
            value={values.parkingType}
            options={parkingTypes}
            name={"parkingType"}
          />
        </div>
      </div>
    </div>
  );
}
