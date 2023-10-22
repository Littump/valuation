import { useState } from "react";

export function TextArea({ value, placeholder }) {
  let [inputIsShown, setInputIsShown] = useState(true);
  return (
    <div className="relative group">
      <textarea
        type="text"
        rows={!inputIsShown ? "1" : "4"}
        className={
          "cursor-default font-semibold pr-10 overflow-y-hidden resize-none p-4 bg-light-gray dark:bg-dark-600 rounded-xl outline-0 border-0 group-hover:text-dark-gray-400 cursor-pointer "
        }
        placeholder={placeholder}
      ></textarea>
      <span
        className="cursor-pointer text-3xl text-dark-gray-600 font-extralight absolute right-4 top-1.5 z-10 group-hover:text-dark-gray-400"
        onClick={() => setInputIsShown(!inputIsShown)}
      >
        {!inputIsShown ? "+" : "-"}
      </span>
    </div>
  );
}
