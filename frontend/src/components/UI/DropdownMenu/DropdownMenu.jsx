import { Field } from "formik";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import arrow from "../../../../public/imgs/arrow.svg";

export default function DropdownMenu({ options, value, name, error }) {
  let [menuIsShown, setMenuIsShown] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => setMenuIsShown(false),
  });
  return (
    <div ref={ref} className="scroll h-full">
      <div
        className={
          "text-dark-gray-400 h-full py-3 px-2 sm:px-4 border dark:border-none rounded-lg relative bg-white dark:bg-dark-600 cursor-pointer border-gray  dark:hover:text-dark-300 dark:text-dark-200 font-semibold hover:text-black " +
          (error ? "border-red dark:border-red" : " dark:border-dark-700")
        }
        onClick={() => setMenuIsShown((prev) => !prev)}
      >
        {value === ""
          ? "выберите"
          : value?.length >= 12
          ? value.toString().substr(0, 9) + "..."
          : value}
        <span className="absolute right-2 sm:right-4">
          <img
            src={arrow}
            alt=""
            className={
              menuIsShown
                ? "transition rotate-[180deg]"
                : "transition rotate-[0deg]"
            }
          />
        </span>
      </div>
      {/*    menu*/}
      <div
        onClick={() => setMenuIsShown(false)}
        className={
          "w-full z-10 grid rounded-lg bg-white dark:bg-dark-600 max-h-32 overflow-x-hidden overflow-y-scroll border border-gray dark:border-dark-700 absolute transition " +
          (!menuIsShown && "invisible")
        }
      >
        {options.map((option) => (
          <label
            className=" py-2 px-2 xs:px-4 transition hover:bg-gray cursor-pointer font-semibold text-dark-gray-400 hover:text-black dark:bg-dark-600 dark:hover:text-dark-300 dark:text-dark-200"
            key={option}
          >
            <Field value={option} name={name} type="radio" className="hidden" />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
