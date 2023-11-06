import { useSelector } from "react-redux";
import PortfolioInfoCard from "./PortfolioInfoCard/PortfolioInfoCard.jsx";

export default function PortfolioInfo() {
  let objects = useSelector((state) => state.myObjects.objects);
  let percent_per_year = 1.05225;
  let percent_per_half_of_year = 1.0421;
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
        heading={"Общая стоимость объектов портфеля при покупкe"}
        color={"red"}
      />
      <PortfolioInfoCard
        cost={fullSumNow * percent_per_half_of_year}
        heading={
          "Предположительная сумма портфеля через полгода ( " +
          ((percent_per_half_of_year - 1) * 100).toFixed(2) +
          "% )"
        }
        color={percent_per_half_of_year >= 1 ? "green" : "red"}
      />
      <PortfolioInfoCard
        cost={fullSumNow * percent_per_year}
        heading={
          "Предположительная сумма портфеля через год ( " +
          ((percent_per_year - 1) * 100).toFixed(2) +
          "% )"
        }
        color={percent_per_year >= 1 ? "green" : "red"}
      />
    </div>
  );
}
