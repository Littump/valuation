import normal from "../../../../public/imgs/iconNormal.png";
import low from "../../../../public/imgs/iconLow.png";
import high from "../../../../public/imgs/iconHigh.png";
import LightHeading from "../LightHeading/LightHeading.jsx";
import Heading from "../Heading/Heading.jsx";
import { Button, Liquidity } from "../Button/Button.jsx";
import { deleteBuildingHook } from "../../../hooks/deleteBuildingHook";

export default function Object({ id, address, cost, liquidity }) {
  const { mutate } = deleteBuildingHook();
  let liquidityImg = {
    низкая: low,
    средняя: normal,
    высокая: high,
  };
  return (
    <div className="max-w-[80vw] sm:max-w-[100vw] sm:mx-0 mx-auto flex flex-col lg:flex-row gap-4 text-center lg:text-start bg-light-gray rounded-xl items-center py-3 px-6 dark:bg-dark-600">
      {<img src={liquidityImg[liquidity]} alt="" />}
      <div className="flex flex-col lg:items-start items-center">
        <LightHeading>ID: {id}</LightHeading>
        <Heading>{address}</Heading>
      </div>
      <div className="text-dark-gray-400 text-xl font-bold lg:ml-auto mr-2 dark:text-dark-100">
        {cost + " млн Р"}
      </div>
      <Liquidity variant={liquidity} />
      <div>
        <button
          type="button"
          onClick={() => {
            mutate(address);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-4 hidden lg:block dark:text-dark-200 transition hover:text-blue-500 dark:hover:text-dark-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>

          <div className="lg:hidden block">
            <Button>удалить</Button>
          </div>
        </button>
      </div>
    </div>
  );
}
