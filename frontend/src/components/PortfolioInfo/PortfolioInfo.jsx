import { useSelector } from "react-redux";
import PortfolioInfoCard from "./PortfolioInfoCard/PortfolioInfoCard.jsx";

export default function PortfolioInfo() {
  let objects = useSelector((state) => state.myObjects.objects);
  let percent_per_year = 1.05225;
  let percent_per_half_of_year = 1.0421;

  let fullSumNow = objects.reduce(
    (sum, el) => +(sum + +el.realCost).toFixed(2),
    0
  );
  let fullSumThen = objects.reduce(
    (sum, el) => +(sum + +el.marketCost).toFixed(2),
    0
  );
  let raise_num = (fullSumNow-fullSumThen).toFixed(2);
  let raise_percent=(((fullSumNow / fullSumThen) - 1)*100).toFixed(2)
  if(fullSumThen === 0){
    raise_percent=0;
  }
  

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <PortfolioInfoCard
        text={fullSumNow + ' млн ₽'}
        heading={"Общая стоимость портфеля"}
        color={"green"}
      />
      <PortfolioInfoCard
        text={`${raise_num>=0 ? "+"+ raise_num : raise_num} млн ₽ ( ${raise_percent >= 0 ? "+" + raise_percent : raise_percent} %)`}
        heading={"Рост портфеля за всё время"}
        color={"red"}
      />
      <PortfolioInfoCard
        text={(fullSumNow * percent_per_half_of_year).toFixed(2) + "млн ₽"}
        heading={
          "Предположительная сумма портфеля через полгода ( " +
         ( percent_per_half_of_year >= 1 ? '+' : '') + ((percent_per_half_of_year - 1) * 100).toFixed(2) +
          "% )"
        }
        color={percent_per_half_of_year >= 1 ? "green" : "red"}
      />
      <PortfolioInfoCard
        text={(fullSumNow * percent_per_year).toFixed(2) + 'млн '}
        heading={
          "Предположительная сумма портфеля через год ( " +
          ( percent_per_year >= 1 ? '+' : '') + ((percent_per_year - 1) * 100).toFixed(2) +
          "% )"
        }
        color={percent_per_year >= 1 ? "green" : "red"}
      />
    </div>
  );
}
