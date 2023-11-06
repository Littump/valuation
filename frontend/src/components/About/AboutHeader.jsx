import Text from "../UI/Text/Text.jsx";
import BorderLayout from "../UI/BorderLayout/BorderLayout.jsx";
import MainHeading from "../UI/MainHeading/MainHeading.jsx";
import presentation from "../../../public/FINODAYS24.pdf";

export default function AboutHeader() {
  return (
    <div className="w-full">
      <BorderLayout>
        <div className="px-4 flex gap-10 py-0 text-center sm:text-start">
          <div className="flex flex-col justify-center gap-3">
            <MainHeading>Наша команда</MainHeading>
            <Text>
              При помощи нашего сервиса вы сможете оценить и получить прогноз на
              стоимость объектов недвижимости, вывести аналитику по рынку
              недвижимости и собственному портфелю, а также произвести оценку
              рисков и подбор похожих объектов
            </Text>
            <div className="flex justify-center sm:justify-start gap-2 flex-wrap sm:gap-6">
              <a
                className="text-blue-500 text-lg hover:text-black transition dark:hover:text-white dark:text-dark-300"
                href={"https://t.me/"}
              >
                телеграм
              </a>
              <a
                className="text-blue-500 text-lg hover:text-black transition dark:hover:text-white dark:text-dark-300"
                href="mailto:estate.valuation.tech@gmail.com"
              >
                почта
              </a>
              <a
                className="text-blue-500 text-lg hover:text-black transition dark:hover:text-white dark:text-dark-300"
                href={presentation}
                download={"презентация"}
              >
                скачать презентацию
              </a>
            </div>
          </div>
        </div>
      </BorderLayout>
    </div>
  );
}
