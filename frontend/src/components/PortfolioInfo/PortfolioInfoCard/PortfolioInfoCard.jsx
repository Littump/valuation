import MainHeading from "../../UI/MainHeading/MainHeading.jsx";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";

export default function PortfolioInfoCard({
  heading = "",
  text = "",
  color = "blue-500",
}) {
  return (
    <div className="bg-light-gray py-8 px-3 flex flex-col gap-2 items-center justify-center rounded-xl h-full dark:bg-dark-600">
      <LightHeading>{heading}</LightHeading>
      <MainHeading>
        <div className={"text-" + color}>
          {text}
        </div>
      </MainHeading>
    </div>
  );
}
