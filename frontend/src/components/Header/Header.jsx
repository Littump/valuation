import Filters from "../Filters/Filters.jsx";
import QrBlock from "../UI/QrBlock/QrBlock.jsx";
import qr from "../../../public/imgs/qr.svg";
export default function Header() {
  return (
    <header className="flex flex-col gap-6 items-center mt-12">
      <QrBlock
        text="При помощи нашего сервиса вы сможете оценить и получить прогноз на
        стоимость объектов недвижимости, вывести аналитику по рынку
        недвижимости и собственному портфелю, а также произвести оценку
        рисков и подбор похожих объектов"
        heading="Наш телеграм бот"
        img={qr}
        link="https://t.me/estate_valuationbot"
      />
      <Filters />
    </header>
  );
}
