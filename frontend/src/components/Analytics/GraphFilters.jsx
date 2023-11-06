import GraphFilterDropdown from "./GraphFilterDropdown.jsx";
import Heading from "../UI/Heading/Heading.jsx";
import { GraphRange } from "./GraphRange.jsx";
import {
  axios,
  houseMaterials,
  houseTypes,
  region,
  repairTypes,
  axiosColumn,
} from "../../config/graph.js";
import { Field } from "formik";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import LightHeading from "../UI/LightHeading/LightHeading.jsx";

export default function GraphFilters({ values, setFieldValue, theme }) {
  const rangeFiltersData = [
    {
      text: "Всего комнат",
      value: values.roomsNumber,
      name: "roomsNumber",
      min: 1,
      max: 60,
    },
    {
      text: "Площадь квартиры",
      value: values.area,
      name: "area",
      min: 1,
      max: 500,
    },
    {
      text: "Этаж",
      value: values.floor,
      name: "floor",
      min: 1,
      max: 200,
    },
    {
      text: "Цена (млн. Р)",
      value: values.price,
      name: "price",
      min: 1,
      max: 500,
    },
    {
      text: "Дата строительства",
      value: values.date,
      name: "date",
      min: 1900,
      max: 2023,
    },
    {
      text: "Метро в минутах",
      value: values.metroMin,
      name: "metroMin",
      min: 0,
      max: 60,
    },
  ];

  let rangeFilters = rangeFiltersData.map((el) => (
    <GraphRange
      key={el.name}
      theme={theme}
      values={el.value}
      name={el.name}
      min={el.min}
      max={el.max}
      text={el.text}
    />
  ));

  const dropdownFiltersData = [
    { text: "Регион", value: values.region, name: "region", options: region },
    {
      text: "Тип дома",
      value: values.houseType,
      name: "houseType",
      options: houseTypes,
    },
    {
      text: "Материал дома",
      value: values.houseMaterial,
      name: "houseMaterial",
      options: houseMaterials,
    },
    {
      text: "Тип ремонта",
      value: values.repairType,
      name: "repairType",
      options: repairTypes,
    },
  ];

  let dropdownFilters = dropdownFiltersData.map((el) => (
    <div className="flex flex-col gap-2 w-36 xs:w-40 sm:w-56" key={el.name}>
      <Heading>{el.text}</Heading>
      <GraphFilterDropdown
        value={el.value}
        name={el.name}
        options={el.options}
      />
    </div>
  ));

  let fieldFiltersData = [
    {
      name: "metroName",
      text: "Метро рядом",
      placeholder: "Название станции",
    },
  ];

  let fieldFilters = fieldFiltersData.map((el) => (
    <div className="flex flex-col gap-2 mr-auto" key={el.name}>
      <Heading>{el.text}</Heading>
      <Field
        name={el.name}
        placeholder={el.placeholder}
        className="myInput w-36 xs:w-40 sm:w-56 py-3"
      />
    </div>
  ));
  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <MainHeading>Данные о доме</MainHeading>
      <LightHeading>Зависимость</LightHeading>

      {values.isColumn ? (
        <div className="flex w-full">
          <GraphFilterDropdown
            value={values.axiosColumn}
            name="axiosColumn"
            options={axiosColumn}
          />
        </div>
      ) : (
        <div className="flex gap-4 flex-row items-center mb-6">
          <GraphFilterDropdown
            value={values.axiosX}
            name="axiosX"
            options={axios}
          />
          <GraphFilterDropdown
            value={values.axiosY}
            name="axiosY"
            options={axios}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-4 flex-row items-center justify-center">
        {dropdownFilters}
        {fieldFilters}
      </div>
      <div className="flex flex-wrap flex-row gap-4 mt-4 items-center justify-center max-w-md sm:max-w-xl">
        {rangeFilters}
      </div>
    </div>
  );
}
