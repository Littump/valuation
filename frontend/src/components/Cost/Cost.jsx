import { useSelector } from "react-redux";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import BorderLayout from "../UI/BorderLayout/BorderLayout.jsx";

export default function Cost() {
  const realcost = useSelector((state) => state.building.realCost);
  const marketCost = useSelector((state) => state.building.marketCost);
  let realCostAnswer = realcost ? realcost + " млн Р" : "введите данные";
  let marketCostAnswer = marketCost ? marketCost + " млн Р" : "введите данные";

  return (
    <div className="flex flex-col gap-6 items-center mx-0 xs:mx-10 sm:mx-0">
      <div className="flex gap-4 sm:flex-row flex-col">
        <BorderLayout>
          <div className="flex flex-col text-center lg:text-start lg:flex-row justify-start gap-4 items-center">
            <div className="rounded-2xl py-10 px-6 w-full lg:w-auto bg-blue-300 dark:bg-dark-600 dark:text-dark-300 flex-nowrap whitespace-nowrap flex justify-center items-center font-bold text-3xl text-blue-500">
              {marketCostAnswer}
            </div>
            <MainHeading>Рыночная стоимость квартиры</MainHeading>
          </div>
        </BorderLayout>
        <BorderLayout>
          <div className="flex flex-col text-center lg:text-start lg:flex-row justify-start gap-4 items-center">
            <div className="rounded-2xl py-10 px-6 w-full lg:w-auto bg-blue-300 dark:bg-dark-600 dark:text-dark-300 flex-nowrap whitespace-nowrap flex justify-center items-center font-bold text-3xl text-blue-500">
              {realCostAnswer}
            </div>
            <MainHeading>Реальная стоимость квартиры</MainHeading>
          </div>
        </BorderLayout>
      </div>
    </div>
  );
}
