import Heading from "../Heading/Heading";
import MainHeading from "../MainHeading/MainHeading";

function ObjectCollapsedInfoItem({ text }) {
  return (
    <>
      <div className="text-dark-gray-400 dark:text-dark-100">{text}</div>
      <div className="text-dark-gray-400 dark:text-dark-100"> - </div>
      <div className="text-black dark:text-dark-300">{text}</div>
    </>
  );
}

export default function ObjectCollapsedInfo({ buildingInfo }) {
  let properties = [
    {
      heading: "Ремонт",
      text:
        buildingInfo.repair === undefined
          ? undefined
          : buildingInfo.repair.join(" "),
    },
    { heading: "Материал", text: buildingInfo.house_material },
    { heading: "Парковка", text: buildingInfo.parking_type },
    { heading: "Этаж", text: buildingInfo.floor },
    {
      heading: "Комнат ",
      text:
        buildingInfo.cnt_rooms === undefined
          ? undefined
          : buildingInfo.cnt_rooms === 0.7
          ? "студия"
          : buildingInfo.cnt_rooms,
    },
    {
      heading: "Площадь",
      text:
        buildingInfo.area === undefined ? undefined : buildingInfo.area + "м²",
    },
    { heading: "Тип квартиры", text: buildingInfo.object_type },
    { heading: "Есть лифт", text: buildingInfo.has_lift ? "да" : "нет" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-2 text-md">
        {properties.map((el) => {
          if (el.text === undefined) return null;
          return (
            <div className="flex gap-2" key={el.heading}>
              <div className="text-dark-gray-400 dark:text-dark-200">
                {el.heading}
              </div>
              <div className="text-dark-gray-400 dark:text-dark-100">: </div>
              <div className="text-black dark:text-dark-300">{el.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
