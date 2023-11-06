import BorderLayout from "../UI/BorderLayout/BorderLayout.jsx";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import { FiltersWrapper } from "./FiltersWrapper.jsx";

export default function Filters() {
  return (
    <div className="w-full bg-light-gray rounded-xl dark:bg-dark-400 ">
      <BorderLayout>
        <div className="flex flex-col items-center gap-10 sm:p-10 lg:p-0 xl:p-10 text-center py-5 sm:py-5">
          <MainHeading>Рассчитайте стоимость квартиры</MainHeading>
          <FiltersWrapper />
        </div>
      </BorderLayout>
    </div>
  );
}
