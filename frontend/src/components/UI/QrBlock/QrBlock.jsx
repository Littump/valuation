import Text from "../../UI/Text/Text.jsx";
import BorderLayout from "../../UI/BorderLayout/BorderLayout.jsx";
import MainHeading from "../../UI/MainHeading/MainHeading.jsx";

export default function QrBlock({ heading, text, img, link }) {
  return (
    <div className="w-full">
      <BorderLayout>
        <div className="flex sm:gap-10 flex-col py-7 sm:py-0 gap-3 sm:flex-row items-center text-center sm:text-start">
          <div className="w-36 h-36 bg-blue-300 rounded-xl flex justify-center items-center">
            <a
              href={link}
              className="w-36 h-36 flex justify-center items-center"
            >
              <img src={img} alt="qr" className="w-28 h-28" />
            </a>
          </div>
          <div className="flex flex-col max-w-xs sm:max-w-none justify-center sm:gap-3">
            <MainHeading>{heading}</MainHeading>
            <Text>{text}</Text>
          </div>
        </div>
      </BorderLayout>
    </div>
  );
}
