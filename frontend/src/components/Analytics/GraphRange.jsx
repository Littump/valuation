import { useState } from "react";
import arrow from "../../../public/imgs/arrow.svg";
import { Field } from "formik";
import { useDetectClickOutside } from "react-detect-click-outside";

export function GraphRange({ values, min, max, name, text }) {
  const [isShown, setIsShown] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setIsShown(false),
  });
  return (
    <div ref={ref} className="flex flex-col gap-2 relative">
      <span className="text-sm dark:text-dark-200">{text}</span>
      <div
        className="myInput w-36 xs:w-40 sm:w-36 flex justify-between px-4 h-full cursor-pointer"
        onClick={() => setIsShown((prev) => !prev)}
      >
        {/* button */}
        {values.min + " - " + values.max}
        <span
          className={
            isShown ? "transition rotate-[180deg]" : "transition rotate-[0deg]"
          }
        >
          <img src={arrow} alt="" />
        </span>
      </div>
      <div
        className={
          "px-8 absolute top-[109%] h-56 -left-8 z-30" +
          (!isShown ? " hidden translate-y-[212%]" : " ")
        }
      >
        <div className="transition flex justify-center w-36 dark:bg-dark-600 rounded-lg py-2 ">
          <div className="flex flex-col gap-4">
            <Field
              type="number"
              name={name + ".min"}
              placeholder={"от"}
              className="myInput w-32 py-3 dark:bg-dark-400"
              min={min}
              max={values.max - 1}
            />
            <Field
              type="number"
              name={name + ".max"}
              placeholder={"до"}
              className="myInput w-32 py-3 dark:bg-dark-400"
              min={values.min + 1}
              max={max}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
