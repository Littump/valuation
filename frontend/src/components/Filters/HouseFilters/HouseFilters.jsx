import { Field } from "formik";
import HouseTags from "./HouseTags.jsx";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";
import DropdownMenu from "../../UI/DropdownMenu/DropdownMenu.jsx";
import { Tag } from "../../UI/Button/Button.jsx";
import {
  flatTypes,
  houseTypes,
  parkingTypes,
  roomsNumberOptions,
} from "../../../config/houseFilters.js";

export default function HouseFilters({ values, errors, touched }) {
  return (
    <div className="flex flex-col gap-4 w-11/12 xs:w-11/12 pl-4 sm:pl-10 lg:pl-0 sm:w-auto text-center sm:text-start">
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
            name="text"
            as="textarea"
            rows="5"
            placeholder={
              errors.text && touched.text
                ? "Обязательное поле"
                : "Текстовое описание квартиры"
            }
            className={
              "myInput resize-none" +
              (errors.text && touched.text
                ? " border border-red dark:border-red"
                : "")
            }
          />
        </div>
        <div className="w-full sm:w-fit">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-col flex-wrap sm:gap-y-4 justify-start gap-3 mt-10 sm:mt-0 w-full">
            <div className="relative xs:w-full sm:w-44 mt-6 xs:mt-10 text-start">
              <div
                className={
                  "absolute -top-7 left-0 font-semibold text-sm dark:text-dark-100" +
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
            <div className="relative xs:w-full sm:w-44 mt-6 xs:mt-10 text-start sm:hidden">
              <div
                className={
                  "absolute -top-7 left-0 font-semibold text-sm dark:text-dark-100" +
                  (errors.roomsNumber && touched.roomsNumber
                    ? "text-red dark:text-red"
                    : "")
                }
              >
                {errors.roomsNumber && touched.roomsNumber
                  ? "обязательное поле"
                  : "Кол-во комнат"}
              </div>
              <DropdownMenu
                name={"roomsNumber"}
                value={values.roomsNumber}
                options={roomsNumberOptions}
                error={errors.roomsNumber && touched.roomsNumber}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="relative xs:w-full sm:w-44 text-start mt-6 xs:mt-10">
                <div
                  className={
                    "absolute -top-7 left-0 font-semibold text-sm dark:text-dark-100" +
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

              <div className="relative xs:w-32 sm:w-44 text-start sm:mt-9 hidden sm:block">
                <div
                  className={
                    "absolute -top-7 left-0 font-semibold text-sm dark:text-dark-100" +
                    (errors.roomsNumber && touched.roomsNumber
                      ? "text-red dark:text-red"
                      : "")
                  }
                >
                  {errors.roomsNumber && touched.roomsNumber
                    ? "обязательное поле"
                    : "Кол-во комнат"}
                </div>
                <DropdownMenu
                  name={"roomsNumber"}
                  value={values.roomsNumber}
                  options={roomsNumberOptions}
                  error={errors.roomsNumber && touched.roomsNumber}
                />
              </div>
            </div>
            <Field
              name="floors"
              type="number"
              placeholder="Всего этажей"
              className={
                "myInput xs:w-full number sm:hidden h-fit block mt-0 xs:mt-10 sm:mt-0" +
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
      <div className="sm:flex gap-3 grid grid-cols-1 xs:grid-cols-2  flex-wrap xs:mt-4 sm:mt-0">
        <Field
          name="square"
          type="number"
          placeholder="Площадь м2"
          className={
            "myInput xs:w-full sm:w-36 number" +
            (errors.square && touched.square
              ? " border border-red dark:border-red"
              : "")
          }
          size="3"
          max="500"
        />

        <Field
          name="floor"
          type="number"
          placeholder="Этаж"
          className={
            "myInput xs:w-full sm:w-24 number " +
            (errors.floor && touched.floor
              ? " border border-red dark:border-red"
              : "")
          }
          size="3"
          max={values.floors === "" ? 100 : parseInt(values.floors)}
        />
        <Field
          name="floors"
          type="number"
          placeholder="Всего этажей"
          className={
            "myInput w-36 number hidden sm:flex" +
            (errors.floor && touched.floor
              ? " border border-red dark:border-red"
              : "")
          }
          size="3"
          max="100"
        />
      </div>
      <div className="flex flex-col gap-2">
        <LightHeading>Инфраструктура</LightHeading>
        <div
          role="group"
          aria-labelledby="my-radio-group"
          className="grid xs:grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-4"
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
