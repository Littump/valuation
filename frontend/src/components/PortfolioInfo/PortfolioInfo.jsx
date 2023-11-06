import { useSelector } from "react-redux";
import PortfolioInfoCard from "./PortfolioInfoCard/PortfolioInfoCard.jsx";

export default function PortfolioInfo() {
  let objects = useSelector((state) => state.myObjects.objects);
  let fullSumNow = objects.reduce(
    (sum, el) => +(sum + +el.marketCost).toFixed(2),
    0
  );
  let fullSumThen = objects.reduce(
    (sum, el) => +(sum + +el.realCost).toFixed(2),
    0
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <PortfolioInfoCard
        cost={fullSumNow}
        heading={"Общая стоимость портфеля"}
        color={"green"}
      />
      <PortfolioInfoCard
        cost={fullSumThen}
        heading={"Общая стоимость объектов портфеля при покупки"}
        color={"red"}
      />
    </div>
  );
}
