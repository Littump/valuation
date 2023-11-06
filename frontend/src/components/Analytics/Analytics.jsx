import Graph from "./Graph.jsx";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import { useState } from "react";

export default function Analytics() {
  let [isAll, setisAll] = useState(true);
  const auth_token = localStorage.getItem("auth_token");
  if (auth_token === null) return <></>;
  return (
    <div className="mt-5">
      <div className="text-center">
        <MainHeading>Аналитика</MainHeading>
        <div className="mt-4 w-40 sm:max-w-[80vw] flex sm:flex-row flex-col mx-auto lg:mx-0 gap-1 bg-white sm:w-fit p-1 rounded-lg border-gray dark:bg-dark-600 dark:text-dark-200">
          <div
            className={
              "h-full rounded-lg py-2 px-3 transition cursor-pointer " +
              (isAll &&
                "bg-black text-white dark:bg-dark-500 dark:text-dark-100")
            }
            onClick={() => setisAll(true)}
          >
            все квартиры
          </div>
          <div
            className={
              "h-full rounded-lg py-2 px-3 transition cursor-pointer " +
              (!isAll &&
                "bg-black text-white dark:bg-dark-500 dark:text-dark-100")
            }
            onClick={() => setisAll(false)}
          >
            мои квартиры
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 max-w-[80vw] lg:max-w-full mx-auto">
        <div>
          <Graph bgColor={"rgba(56,144,200,1)"} num={1} type={isAll} />
        </div>
        <div className="hidden lg:block">
          <Graph bgColor={"rgba(200,0,4,1)"} num={2} type={isAll} />
        </div>
      </div>
    </div>
  );
}
