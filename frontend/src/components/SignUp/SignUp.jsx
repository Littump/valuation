import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PurpleButton } from "../UI/Button/Button.jsx";
import { Link } from "react-router-dom";
import { signUpHook } from "../../hooks/signUpHook.js";

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Слишком короткий!")
    .max(50, "Слишком длинный!")
    .required("Обязательное поле"),
  email: Yup.string().email("Invalid email").required("Required"),
  userName: Yup.string()
    .matches(/[A-Za-z]$/, "Допускаются только латинские буквы")
    .required("Required"),
  firstName: Yup.string()
    .matches(/[А-Яа-яЁё]$/, "Допускаются только кирилические буквы")
    .required("Required"),
  lastName: Yup.string()
    .matches(/[А-Яа-яЁё]$/, "Допускаются только кирилические буквы")
    .required("Required"),
});

export default function SignUp() {
  const { mutate } = signUpHook();

  return (
    <div className="w-full mt-16 flex flex-col gap-3 justify-center items-center">
      <Formik
        initialValues={{
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => mutate(values)}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-col items-center gap-4 bg-light-gray w-96 py-6 px-14 rounded-xl">
              <label>
                Имя пользователя
                <Field
                  type="name"
                  name="userName"
                  className="myInput"
                  placeholder="придумайте имя пользователя"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red"
                />
              </label>
              <label>
                Имя
                <Field
                  type="name"
                  name="firstName"
                  className="myInput"
                  placeholder="Иван"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red"
                />
              </label>
              <label>
                Фамилия
                <Field
                  type="name"
                  name="lastName"
                  className="myInput"
                  placeholder="Иванов"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red"
                />
              </label>
              <label>
                Корпоротивная почта
                <Field
                  type="email"
                  name="email"
                  className="myInput"
                  placeholder="@gazprombank.ru"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red"
                />
              </label>
              <label>
                Пароль
                <Field
                  type="password"
                  name="password"
                  className="myInput"
                  placeholder="пароль"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red"
                />
              </label>
              <button type="submit" disabled={isSubmitting} className="w-52">
                <PurpleButton>Вход</PurpleButton>
              </button>
            </Form>
          );
        }}
      </Formik>
      <Link to="/">Назад</Link>
      <Link to="/login">Уже есть аккаунт?</Link>
    </div>
  );
}
