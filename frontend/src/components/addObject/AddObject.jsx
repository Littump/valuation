import * as yup from "yup";
import { PurpleButton } from "../UI/Button/Button";
import { useState } from "react";
import { addBuildingHook } from "../../hooks/addBuildingHook";
import { Field, Form, Formik } from "formik";

const validationsSchema = yup.object().shape({
  price: yup.string().typeError("Должно быть строкой").required("Обязательно"),
});

export default function AddObject() {
  let [isButtonActive, setIsButtonActive] = useState(true);
  const { mutate } = addBuildingHook();
  const auth_token = localStorage.getItem("auth_token");
  if (auth_token === null) return <></>;
  return (
    <Formik
      initialValues={{
        price: 0,
      }}
      validationSchema={validationsSchema}
      onSubmit={(values) => {
        if (values.price !== 0) {
          setIsButtonActive(false);
          mutate(values.price);
        } else {
          alert("Введите цену");
        }
      }}
    >
      {({ values, errors, touched }) => {
        return (
          <Form className="sm:w-full mx-auto flex sm:justify-center gap-3 flex-col-reverse sm:flex-row items-center">
            <Field
              name="price"
              type="number"
              placeholder="цена преобретения(млн)"
              className={
                "myInput w-36 number" +
                (errors.price && touched.price
                  ? " border border-red dark:border-red"
                  : "")
              }
              min="0"
              max="500"
            />
            {isButtonActive ? (
              <PurpleButton>
                <button type="submit" className="w-full px-5 sm:px-0">
                  Добавить квартиру в портфель
                </button>
              </PurpleButton>
            ) : (
              <div className="text-center bg-gray py-2 px-3 rounded-lg text-md font-semibold dark:bg-dark-800 dark:text-dark-100">
                Квартира успешно добавлена
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
