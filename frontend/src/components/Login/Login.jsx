import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PurpleButton } from "../UI/Button/Button.jsx";
import { Link } from "react-router-dom";
import { loginHook } from "../../hooks/loginHook.js";
import Loading from "../UI/Loading/Loading.jsx";
const loginSchema = Yup.object().shape({
  password: Yup.string().required("Обязательное поле"),
  username: Yup.string().required("Обязательное поле"),
});

export default function Login() {
  const mutation = loginHook();
  const auth_token = localStorage.getItem("auth_token");

  return (
    <>
      {auth_token === null ? (
        <div className=" bg-gradient-to-tr from-white dark:from-dark-gray-600 from-70% to-blue-500 dark:to-dark-gray-600 w-full h-[100vh] flex flex-col gap-3 justify-center items-center ">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => mutation.mutate(values)}
          >
            {({ isSubmitting }) => {
              return (
                <Form className="relative flex flex-col items-start px-5 gap-4 rounded-xl bg-light-gray w-90 py-8 dark:bg-dark-400">
                  <Link
                    className="absolute top-4 right-2 group py-4 px-2"
                    to="/"
                  >
                    <span className="block h-[2px] w-[16px] group-hover:opacity-90 transition dark:bg-dark-100 dark:opacity-100 bg-dark-gray-400 opacity-50 rounded-sm"></span>
                  </Link>

                  <h2 className="text-lg text-black font-semibold dark:text-dark-100 pb-4">
                    Вход в учетную запись
                  </h2>
                  <label className="dark:text-dark-100 text-black flex flex-col gap-2">
                    <div className="text-dark-gray-400 dark:text-dark-200 font-semibold text-sm">
                      Логин
                    </div>
                    <Field
                      type="text"
                      name="username"
                      className="myInput py-3 w-90"
                      placeholder="ivan.ivanov"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red"
                    />
                  </label>
                  <label className="dark:text-dark-100 text-black flex flex-col gap-2">
                    <div className="text-dark-gray-400 dark:text-dark-200 font-semibold text-sm">
                      Пароль
                    </div>
                    <Field
                      type="password"
                      name="password"
                      className="myInput py-3 w-90"
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
                    className="w-full"
                  >
                    <PurpleButton variant="light">
                      {mutation.isLoading ? <Loading /> : "Вход"}
                    </PurpleButton>
                  </button>
                </Form>
              );
            }}
          </Formik>
          {/* <Link
            to="/"
            className="text-white dark:text-dark-100 dark:hover:text-dark-300 hover:text-blue-500"
          >
            Назад
          </Link> */}
        </div>
      ) : (
        <div className="w-full h-[76vh] flex flex-col gap-3 justify-center items-center">
          <div className="bg-blue-300 border border-blue-500 py-16 px-10 rounded-xl text-center flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Вы уже вошли</h1>
            <Link to="/">Назад</Link>
            <Link to="/">
              <button
                type="button"
                onClick={localStorage.clear("auth_token")}
              ></button>
              выйти
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
