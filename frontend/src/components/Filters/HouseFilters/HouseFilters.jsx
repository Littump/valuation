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
    <div className="flex flex-col gap-4 w-10/12 sm:w-auto text-center sm:text-start">
      <div className="flex flex-col gap-4">
        <LightHeading>Данные о доме</LightHeading>
        <div className="flex relative flex-col sm:flex-row gap-10 sm:gap-4">
          <Field
            name="address"
            placeholder={
              errors.address && touched.address
                ? "Обязательное поле"
                : "Введите адрес"
            }
            className={
              "myInput " +
              (errors.address && touched.address
                ? "border border-red dark:border-red"
                : "")
            }
          />
          <div className="relative sm:w-52">
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
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <LightHeading>Основные данные о квартире</LightHeading>
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-4 scroll">
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
          <div className="w-full flex flex-col justify-between relative sm:w-52 gap-2 sm:gap-0">
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
            <div className="w-full sm:w-auto flex sm:justify-between gap-2 sm:gap-0">
              <Field
                name="roomsNumber"
                type="number"
                placeholder="К-во комнат"
                className={
                  "myInput w-8/12 sm:w-32 number" +
                  (errors.roomsNumber && touched.roomsNumber
                    ? " border border-red dark:border-red"
                    : "")
                }
                size="3"
                max="1000"
              />
              <Field
                name="floor"
                type="number"
                placeholder="Этаж"
                className={
                  "myInput w-4/12 sm:w-16 number" +
                  (errors.floor && touched.floor
                    ? " border border-red dark:border-red"
                    : "")
                }
                size="3"
                max="100"
              />
            </div>
          </div>
        </div>
        <div>
          <Field
            name="square"
            type="number"
            placeholder="площадь м2"
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
      <div className="flex flex-col gap-2">
        <LightHeading>Инфраструктура</LightHeading>
        <div
          role="group"
          aria-labelledby="my-radio-group"
          className="flex flex-wrap gap-4 mt-4"
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
