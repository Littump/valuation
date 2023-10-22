import { useSelector } from "react-redux";
import NavLink from "../UI/NavLinkComponent/NavLinkComponent";

export default function PhoneMenu({ menuIsShown }) {
  let menuClass = menuIsShown
    ? " translate-x-0"
    : " sm:translate-x-[45vw] translate-x-[100vw]";
  let address = useSelector((state) => state.building.buildingInfo.address);
  return (
    <div
      className={
        "flex flex-col items-end justify-start gap-10 md:hidden h-[100vh] bg-white shadow-xl py-7 px-6 transition duration-300 w-[80vw] sm:w-[45vw] fixed top-0 dark:bg-dark-400 right-0 z-10" +
        menuClass
      }
    >
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7 hover:text-blue-500 transition text-dark-gray-400 dark:text-dark-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ul className="flex flex-col gap-6 w-full justify-center text-end">
        <li>
          <NavLink text="Оценка стоимости квартиры" href="/" />
        </li>
        <li>
          <NavLink text="Аналитика" href="/analytics" />
        </li>
        <li>
          <NavLink text="Оценка рисков" href="/info" />
        </li>
        {address === "" || address === null || address === undefined ? null : (
          <li>
            <NavLink href="/analysis" text="Анализ" />
          </li>
        )}
      </ul>
    </div>
  );
}
