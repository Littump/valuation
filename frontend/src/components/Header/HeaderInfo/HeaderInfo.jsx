import Text from "../../UI/Text/Text.jsx";
import BorderLayout from "../../UI/BorderLayout/BorderLayout.jsx";
import MainHeading from "../../UI/MainHeading/MainHeading.jsx";
import qr from "./../../../../public/imgs/qr.svg";
export default function HeaderInfo() {
  return (
    <div className="w-full">
      <BorderLayout>
        <div className="flex sm:gap-10 flex-col py-7 sm:py-0 gap-3 sm:flex-row items-center text-center sm:text-start">
          <div className="w-36 h-36 bg-blue-300 rounded-xl flex justify-center items-center">
            <a href="https://t.me/estate_valuationbot" className="w-28 h-28">
              <img src={qr} alt="qr" />
            </a>
          </div>
          <div className="flex flex-col justify-center sm:gap-3">
            <MainHeading>О нас</MainHeading>
            <Text>Узнайте о нас больше</Text>
          </div>
        </div>
      </BorderLayout>
    </div>
  );
}
