import { useSelector } from "react-redux";
import PortfolioInfoCard from "./PortfolioInfoCard/PortfolioInfoCard.jsx";

export default function PortfolioInfo() {
  let objects = useSelector((state) => state.myObjects.objects);
  let fullSum = objects.reduce((sum, el) => +(sum + +el.cost).toFixed(2), 0);
  let portfolioData = [
    { heading: "Динамика за последние полгода", cost: 2.5 },
    { heading: "Динамика за последний год", cost: -3 },
    { heading: "Динамика за последние 5 лет", cost: 20 },
  ];
  let portfolioInfoCards = portfolioData.map((info) => (
    <PortfolioInfoCard
      key={info.heading + info.cost}
      cost={info.cost}
      heading={info.heading}
      color={info.cost >= 0 ? "green" : "red"}
    />
  ));
  return (
    <div className="grid grid-cols-2 gap-6 ">
      <PortfolioInfoCard cost={fullSum} heading={"Общая стоимость портфеля"} />
      {portfolioInfoCards}
    </div>
  );
}
