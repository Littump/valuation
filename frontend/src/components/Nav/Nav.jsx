import { BlackButton } from "../UI/Button/Button.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import DesktopMenu from "./DesktopMenu.jsx";
import PhoneMenu from "./PhoneMenu.jsx";
import { useDetectClickOutside } from "react-detect-click-outside";
export default function Nav() {
  let [menuIsShown, setMenuIsShown] = useState(false);
  const auth_token = localStorage.getItem("auth_token");
  let dispatch = useDispatch();
  const ref = useDetectClickOutside({
    onTriggered: () => setMenuIsShown(false),
  });
  return (
    <>
      <div
        ref={ref}
        className="
        nav
        z-10
        fixed top-0 left-0 w-full flex justify-center items-center flex-row-reverse lg:flex-row
        shadow-sm py-5 dark:shadow-md
        bg-white dark:bg-dark-400
        px-4 xs:px-7 text-gray-600 dark:text-dark-100
        "
      >
        <button
          className="lg:hidden ml-auto"
          type="button"
          onClick={() => setMenuIsShown((prev) => !prev)}
        >
          <svg
            width="24"
            height="24"
            className="hover:text-blue-500 transition dark:hover:text-dark-300"
          >
            <path
              d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <DesktopMenu />
        <ul className="lg:ml-auto flex lg:gap-10 gap-4 xs:gap-8 flex-row-reverse lg:flex-row items-center">
          <li>
            <label className="swap swap-rotate translate-y-1 group">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                onClick={() => {
                  dispatch({ type: "theme/toggleTheme" });
                }}
              />
              {/* sun icon */}
              <svg
                className="swap-on w-6 h-6 transition fill-black group-hover:fill-blue-500 dark:fill-dark-200 dark:group-hover:fill-dark-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off w-6 h-6 transition dark:fill-dark-200 dark:group-hover:fill-dark-300 fill-black group-hover:fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {" "}
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </li>
          <li>
            {auth_token === null ? (
              <Link to="/login">
                <BlackButton>
                  <div className="px-10 w-full h-full">Войти</div>
                </BlackButton>
              </Link>
            ) : (
              <div className="flex gap-2 flex-row-reverse lg:flex-row">
                <button
                  className="hover:text-blue-500 dark:hover:text-dark-300 transition"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("auth_token");
                  }}
                >
                  Выйти
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            )}
          </li>
        </ul>
      </div>
      <PhoneMenu menuIsShown={menuIsShown} setMenuIsShown={setMenuIsShown} />
    </>
  );
}
