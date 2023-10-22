import { Form, Formik } from "formik";
import HouseFilters from "./HouseFilters/HouseFilters.jsx";
import RenovationFilters from "./RenovationFilters/RenovationFilters.jsx";
import { PurpleButton } from "../UI/Button/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getPriceHook } from "../../hooks/getPriceHook.js";
import getRepairType from "../../functions/getRepairType.js";

export function FiltersWrapper() {
  const dispatch = useDispatch();
  const repairX = useSelector((state) => state.renovation.renovationTypeX);
  const repairY = useSelector((state) => state.renovation.renovationTypeY);
  const images = useSelector((state) => state.renovation.images);
  const { mutate } = getPriceHook();
  const validationsSchema = yup.object().shape({
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
  });

  return (
    <Formik
      initialValues={{
        hasLift: false,
        parkingType: "",
        address: "",
        houseType: "",
        description: "",
        flatType: "",
        square: "",
        roomsNumber: "",
        floor: "",
        renovationType: "",
        renovationTypePicked: "",
      }}
      validationSchema={validationsSchema}
      onSubmit={(values) => {
        let buildingInfo = {
          hasLift: values.hasLift,
          parkingType: values.parkingType,
          address: values.address,
          houseType: values.houseType,
          description: values.description,
          flatType: values.flatType,
          square: values.square,
          roomsNumber: values.roomsNumber,
          floor: values.floor,
          repair:
            values.renovationTypePicked !== ""
              ? getRepairType(
                  values.renovationType,
                  values.renovationTypePicked
                )
              : images.length !== 0
              ? getRepairType(repairX.trim(), repairY.trim())
              : "1;3",
        };
        dispatch({
          type: "analysis/setBuildingInfo",
          buildingInfo,
        });
        mutate(buildingInfo);
      }}
    >
      {({ values, errors, touched }) => {
        return (
          <Form className="flex flex-col gap-8 lg:max-w-full max-w-xl text-start">
            <div className="lg:grid lg:grid-cols-2 flex flex-col-reverse items-center lg:items-start gap-10 lg:gap-0">
              <HouseFilters values={values} errors={errors} touched={touched} />
              <RenovationFilters values={values} />
            </div>
            <div className="w-full flex justify-center">
              <PurpleButton variant="light">
                <button className="w-full h-full px-10" type="submit">
                  Рассчитать стоимость
                </button>
              </PurpleButton>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
