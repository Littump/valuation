import GraphFilterDropdown from "./GraphFilterDropdown.jsx";
import Heading from "../UI/Heading/Heading.jsx";
import { GraphRange } from "./GraphRange.jsx";
import {
  axios,
  houseMaterials,
  houseTypes,
  region,
  repairTypes,
} from "../../config/graph.js";
import { Field } from "formik";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import LightHeading from "../UI/LightHeading/LightHeading.jsx";

export default function GraphFilters({ values, setFieldValue, theme }) {
  const diapasonFiltersData = [
    {
      text: "Всего комнат",
      value: values.roomsNumber,
      name: "roomsNumber",
      min: 1,
      max: 60,
      hidden: !(values.activeFilter === "Всего комнат"),
    },
    {
      text: "Площадь квартиры",
      value: values.area,
      name: "area",
      min: 1,
      max: 500,
      hidden: !(values.activeFilter === "Площадь квартиры"),
    },
    {
      text: "Этаж",
      value: values.floor,
      name: "floor",
      min: 1,
      max: 200,
      hidden: !(values.activeFilter === "Этаж"),
    },
    {
      text: "Цена (млн. Р)",
      value: values.price,
      name: "price",
      min: 1,
      max: 500,
      hidden: !(values.activeFilter === "Цена (млн. Р)"),
    },
    {
      text: "Дата строительства",
      value: values.date,
      name: "date",
      min: 1900,
      max: 2023,
      hidden: !(values.activeFilter === "Дата строительства"),
    },
    {
      text: "Метро в минутах (если нет - 0)",
      value: values.metroMin,
      name: "metroMin",
      min: 0,
      max: 60,
      hidden: !(values.activeFilter === "Метро в минутах (если нет - 0)"),
    },
  ];

  let diapasonFilters = diapasonFiltersData.map((el) => (
    <div className={"graphRange" + (el.hidden ? " hidden" : "")} key={el.name}>
      <Heading>{el.text}</Heading>
      <GraphRange
        theme={theme}
        values={el.value}
        setFieldValue={(value) => setFieldValue(el.name, value)}
        min={el.min}
        max={el.max}
      />
    </div>
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
      text: "тип ремонта",
      value: values.repairType,
      name: "repairType",
      options: repairTypes,
    },
  ];

  let dropdownFilters = dropdownFiltersData.map((el) => (
    <div className="flex flex-col gap-2" key={el.name}>
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
    },
  ];

  let fieldFilters = fieldFiltersData.map((el) => (
    <Field
      key={el.name}
      name={el.name}
      placeholder={el.text}
      className="myInput "
    />
  ));
  return (
    <div className="flex flex-col gap-4 mt-4">
      <MainHeading>Данные о доме</MainHeading>

      <LightHeading>Оси</LightHeading>
      <div className="flex gap-4 md:flex-row flex-col">
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
      <LightHeading>Фильтры</LightHeading>
      <div className="flex flex-wrap gap-4 md:flex-row flex-col">
        {dropdownFilters}
        {fieldFilters}
      </div>

      <LightHeading>Диапозоны данных</LightHeading>
      <div className="w-full flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <GraphFilterDropdown
            value={values.activeFilter}
            name="activeFilter"
            options={diapasonFiltersData.map((el) => el.text)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">{diapasonFilters}</div>
      {/*<div className="flex flex-col gap-1">*/}
      {/*    <LightHeading>Инфраструктура</LightHeading>*/}
      {/*    <div role="group" aria-labelledby="my-radio-group"*/}
      {/*         className="flex flex-wrap gap-4 mt-4">*/}
      {/*        <GraphTags values={values.tags} name='tags' options={tags}/>*/}
      {/*    </div>*/}

      {/*</div>*/}
    </div>
  );
}
