import Filters from "../Filters/Filters.jsx";
import QrBlock from "../UI/QrBlock/QrBlock.jsx";
import qr from "../../../public/imgs/qr.svg";
export default function Header() {
  return (
    <header className="flex flex-col gap-6 items-center mt-12">
      <QrBlock
        text="Получите оценку квартиры прямо в телеграм"
        heading="Наш телеграм бот"
        img={qr}
        link="https://t.me/estate_valuationbot"
      />
      <Filters />
    </header>
  );
}
