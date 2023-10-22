export function Button({ children }) {
  return (
    <div className="button font-semibold text-black hover:text-blue-500 active:text-white  dark:bg-dark-400 dark:text-dark-100 dark:hover:text-dark-300">
      {children}
    </div>
  );
}

export function BlackButton({ children }) {
  return (
    <div className="button text-white hover:bg-dark-gray-400 bg-dark-gray-500 active:bg-dark-gray-600 dark:bg-dark-500 dark:hover:bg-dark-800">
      {children}
    </div>
  );
}

export function PurpleButton({ children, variant = "normal" }) {
  let buttonClass =
    "button text-white font-semibold dark:text-dark-200 dark:hover:text-dark-100 ";
  if (variant === "light")
    buttonClass +=
      "bg-blue-500 dark:bg-dark-500 hover:bg-blue-400 dark:hover:bg-dark-800";
  if (variant === "normal")
    buttonClass +=
      "bg-blue-600 dark:bg-dark-500 hover:bg-blue-500 dark:hover:bg-dark-800";
  if (variant === "dark")
    buttonClass +=
      "bg-blue-700 dark:bg-dark-500 hover:bg-blue-600 dark:hover:bg-dark-800";
  return <div className={buttonClass}>{children}</div>;
}
export function Liquidity({ variant = "normal" }) {
  let buttonClass = "button font-semibold border cursor-default ";
  if (variant === "низкая") buttonClass += "border-red text-red";
  if (variant === "средняя") buttonClass += "border-blue-500 text-blue-500";
  if (variant === "высокая") buttonClass += "border-green text-green";
  let buttonText =
    variant === "низкая"
      ? "Низкая ликвидность"
      : variant === "средняя"
      ? "Средняя ликвидность"
      : "Высокая ликвидность";
  return <div className={buttonClass}>{buttonText}</div>;
}

export function Tag({ children, active = false }) {
  let tagClass =
    "button border border-blue-400 text-sm font-semibold hover:border-blue-500 active:bg-blue-400 active:text-white dark:active:bg-dark-500 dark:hover:border-dark-300 dark:active:bg-dark-800";
  if (active)
    tagClass +=
      " bg-blue-400 dark:bg-dark-500 text-white dark:text-dark-200 border-blue-500 dark:border-dark-500";
  else
    tagClass +=
      " dark:bg-dark-600 bg-blue-200 text-black dark:text-dark-200 dark:border-dark-600";
  return <div className={tagClass}>{children}</div>;
}
