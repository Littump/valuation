import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import PortfolioInfo from "../PortfolioInfo/PortfolioInfo.jsx";
import PortfolioGraph from "../PortfolioGraph/PortfolioGraph.jsx";
import { PortfolioObjects } from "../PortfolioObjects/PortfolioObjects.jsx";

export function Portfolio() {
  const auth_token = localStorage.getItem("auth_token");
  if (auth_token === null) return <></>;
  return (
    <div className="py-10 xs:px-8 md:px-0">
      <div className="flex flex-col text-center items-center gap-20">
        <div className="flex gap-8 flex-col w-full lg:flex-row">
          <div className="lg:w-7/12 flex flex-col gap-6">
            <div className="bg-light-gray rounded-xl py-10 dark:bg-dark-600">
              <MainHeading>
                Информация о квартирах в залоговом портфеле банка
              </MainHeading>
            </div>
            <PortfolioInfo />
          </div>
          <div className="lg:w-5/12">
            <PortfolioGraph />
          </div>
        </div>
        <PortfolioObjects />
      </div>
    </div>
  );
}
