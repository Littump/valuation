import { useSelector } from "react-redux";
import NavLink from "../UI/NavLinkComponent/NavLinkComponent";

export default function DesktopMenu() {
  let address = useSelector((state) => state.building.buildingInfo.address);
  let token = localStorage.getItem("auth_token");
  return (
    <ul className="gap-10 justify-start items-center hidden lg:flex">
      <li>
        <NavLink text="Оценка стоимости квартиры" href="/" />
      </li>
      <li>
        <NavLink text="О нас" href="/about" />
      </li>

      {token === null ? (
        <></>
      ) : (
        <>
          <li>
            <NavLink text="Аналитика" href="/analytics" />
          </li>
          <li>
            <NavLink text="Оценка рисков" href="/info" />
          </li>
        </>
      )}
      {address === "" || address === null || address === undefined ? null : (
        <li>
          <NavLink href="/analysis" text="Анализ" />
        </li>
      )}
    </ul>
  );
}
