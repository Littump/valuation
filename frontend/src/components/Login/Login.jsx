import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PurpleButton } from "../UI/Button/Button.jsx";
import { Link } from "react-router-dom";
import { loginHook } from "../../hooks/loginHook.js";

const loginSchema = Yup.object().shape({
  password: Yup.string().required("Обязательное поле"),
  username: Yup.string().required("Обязательное поле"),
});

export default function Login() {
  const { mutate } = loginHook();
  const auth_token = localStorage.getItem("auth_token");

  return (
    <>
      {auth_token === null ? (
        <div className="w-full h-[76vh] flex flex-col gap-3 justify-center items-center dark:bg-dark-400">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => mutate(values)}
          >
            {({ isSubmitting }) => {
              return (
                <Form className="flex flex-col items-center gap-4 bg-light-gray w-96 py-6 px-14 rounded-xl dark:border-dark-300 dark:border dark:bg-dark-400">
                  <label className="dark:text-dark-100">
                    Корпоротивная почта
                    <Field
                      type="text"
                      name="username"
                      className="myInput"
                      placeholder="ivan.ivanov"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red"
                    />
                  </label>
                  <label className="dark:text-dark-100">
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-52"
                  >
                    <PurpleButton>Вход</PurpleButton>
                  </button>
                </Form>
              );
            }}
          </Formik>
          <Link
            to="/"
            className="dark:text-dark-100 dark:hover:text-dark-300 hover:text-blue-500"
          >
            Назад
          </Link>
        </div>
      ) : (
        <div className="w-full h-[76vh] flex flex-col gap-3 justify-center items-center">
          <div className="bg-blue-300 border border-blue-500 py-16 px-10 rounded-xl text-center flex flex-col gap-4">
            <h1 className="text-3xl font-bold">У вас уже есть аккант</h1>
            <Link to="/">Назад</Link>
          </div>
        </div>
      )}
    </>
  );
}
