import { Field, Form, Formik } from "formik";
import HouseFilters from "./HouseFilters/HouseFilters.jsx";
import RenovationFilters from "./RenovationFilters/RenovationFilters.jsx";
import { PurpleButton } from "../UI/Button/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getPriceHook } from "../../hooks/getPriceHook.js";
import getRepairType from "../../functions/getRepairType.js";
import Loading from "../UI/Loading/Loading.jsx";
import { addBuildingHook } from "../../hooks/addBuildingHook";

export function FiltersWrapper() {
  const dispatch = useDispatch();
  const repairX = useSelector((state) => state.renovation.renovationTypeX);
  const repairY = useSelector((state) => state.renovation.renovationTypeY);
  const images = useSelector((state) => state.renovation.images);

  const getPriceMutation = getPriceHook();
  const addBuildingMutation = addBuildingHook();
  const auth_token = localStorage.getItem("auth_token");

  const validationsSchema = yup.object().shape({
    addBuilding: yup.boolean(),
    setCoordinates: yup.boolean(),
    address: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    houseType: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    flatType: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    square: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    roomsNumber: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    floor: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    floors: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    price: yup.string().when("addBuilding", {
      is: true,
      then: () =>
        yup
          .string()
          .typeError("Должно быть строкой")
          .required("Введите стоимость"),
    }),
    coordinatesX: yup.string().when("setCoordinates", {
      is: true,
      then: () =>
        yup
          .string()
          .typeError("Должно быть строкой")
          .required("Введите координаты"),
    }),
    coordinatesY: yup.string().when("setCoordinates", {
      is: true,
      then: () =>
        yup
          .string()
          .typeError("Должно быть строкой")
          .required("Введите координаты"),
    }),
  });
  return (
    <Formik
      initialValues={{
        hasLift: false,
        parkingType: "",
        address: "",
        houseType: "",
        text: "",
        flatType: "",
        square: "",
        roomsNumber: "",
        floor: "",
        floors: "",
        renovationType: "",
        renovationTypePicked: "",
        addBuilding: false,
        setCoordinates: false,
        isDrop: true,
        coordinatesX: "",
        coordinatesY: "",
        price: "",
      }}
      validationSchema={validationsSchema}
      onSubmit={(values) => {
        console.log(values)
        let buildingInfo = {
          hasLift: values.hasLift,
          parkingType: values.parkingType,
          address: values.address,
          houseType: values.houseType,
          text: values.text,
          flatType: values.flatType,
          square: values.square,
          roomsNumber: values.roomsNumber,
          setCoordinates: values.setCoordinates,
          coordinates: [values.coordinatesX, values.coordinatesY],
          floor: values.floor,
          floors: values.floors,
          repair: !values.isDrop
            ? getRepairType(values.renovationType, values.renovationTypePicked)
            : images.length !== 0
            ? getRepairType(repairX.trim(), repairY.trim())
            : "1;1",
        };
        dispatch({
          type: "analysis/setBuildingInfo",
          buildingInfo,
        });
        getPriceMutation.mutate(buildingInfo);
        if (values.addBuilding) {
          addBuildingMutation.mutate({ buildingInfo, price: values.price }); //todo price yflj gthtlfnm
        }
      }}
    >
      {({ values, errors, touched, setFieldValue, setValues }) => {
        return (
          <Form className="flex flex-col gap-8 lg:max-w-full max-w-xl text-start">
            <div className=" lg:flex lg:flex-row w-full flex flex-col-reverse items-center lg:items-start lg:gap-6">
              <HouseFilters values={values} errors={errors} touched={touched} />
              <RenovationFilters values={values} setIsDrop={setFieldValue} />
            </div>
            <div className="w-64 xs:w-72 mx-auto flex justify-center flex-col gap-2">
              {auth_token === null ? (
                <></>
              ) : (
                <div>
                  <label className="label cursor-pointer flex gap-2 justify-center">
                    <Field
                      type="checkbox"
                      name="addBuilding"
                      className="checkbox ml-0 border-black dark:border-dark-200"
                    />
                    <span className="label-text font-semibold text-black dark:text-dark-100">
                      Добавить квартиру в портфель
                    </span>
                  </label>
                </div>
              )}
              <div className="mb-2 relative">
                <Field
                  name="price"
                  type="number"
                  placeholder="Цена приобретения, млн ₽"
                  className={
                    "myInput w-full number " +
                    (!values.addBuilding && "hidden") +
                    (errors.price && touched.price
                      ? " border border-red dark:border-red"
                      : "")
                  }
                  size="3"
                  max="500"
                />
                <div
                className=" top-24 -left-96 absolute lg:block hidden w-44 h-10 cursor-pointer font-semibold dark:text-dark-200 dark:hover:text-dark-100"
                onClick={()=>{
                  setValues({
                    hasLift: false,
                    parkingType: "многоуровневая парковка",
                    address: "Москва, улица Профсоюзная, дом 42",
                    houseType: "монолитный",
                    text: "Дом возле парка с видом на озеро, велодорожки и скейтпарк",
                    flatType: "первичка",
                    square: "65",
                    roomsNumber: "3",
                    floor: "11",
                    floors: "24",
                    renovationType: "С ремонтом и мебелью",
                    renovationTypePicked: "евроремонт",
                    addBuilding: true,
                    setCoordinates: false,
                    isDrop: true,
                    coordinatesX: "",
                    coordinatesY: "",
                    price: "7",
                      })}}
              >
                  пример
              </div>
              </div>
              <button
                className="button text-white font-semibold dark:text-dark-200 dark:hover:text-dark-100 bg-blue-500 dark:bg-dark-500 hover:bg-blue-400 dark:hover:bg-dark-800 w-full h-full xs:px-10 flex justify-center items-center"
                type="submit"
              >
                {getPriceMutation.isLoading ? (
                  <Loading />
                ) : (
                  "Рассчитать стоимость"
                )}
              </button>
              
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
