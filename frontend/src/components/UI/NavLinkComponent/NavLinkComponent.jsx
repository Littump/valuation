import { NavLink } from "react-router-dom";
export default function NavLinkComponent({ text = "", href = "/" }) {
  function getClass(isActive) {
    return (
      "transition hover:text-blue-500 hover:border-b border-blue-500 dark:border-dark-100 pb-1 font-semibold dark:text-dark-100 " +
      (isActive
        ? "text-blue-500 border-b dark:text-dark-300 dark:border-dark-300"
        : "text-dark-gray-400")
    );
  }
  return (
    <>
      <NavLink to={href} className={({ isActive }) => getClass(isActive)}>
        {text}
      </NavLink>
    </>
  );
}
