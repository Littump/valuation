import DropdownMenu from "../../../UI/DropdownMenu/DropdownMenu.jsx";
import img1 from "../../../../../public/imgs/renovation/1.png";
import img2 from "../../../../../public/imgs/renovation/2.png";
import img3 from "../../../../../public/imgs/renovation/3.png";
import img4 from "../../../../../public/imgs/renovation/4.png";
import img5 from "../../../../../public/imgs/renovation/5.png";
import img6 from "../../../../../public/imgs/renovation/6.png";
import img7 from "../../../../../public/imgs/renovation/7.png";
import img8 from "../../../../../public/imgs/renovation/8.png";
import img9 from "../../../../../public/imgs/renovation/9.png";
import img10 from "../../../../../public/imgs/renovation/10.png";
import img11 from "../../../../../public/imgs/renovation/11.png";
import { Field } from "formik";
export default function TextComponent({ values }) {
  const renovationTypes = [
    "С ремонтом и мебелью",
    "С ремонтом и без мебели",
    "Без ремонта",
  ];
  let variants = {
    "С ремонтом и мебелью": [
      { name: "дизайнерский ремонт", img: img5 },
      { name: "евроремонт", img: img6 },
      { name: "косметический ремонт", img: img7 },
      { name: "старый ремонт", img: img8 },
    ],
    "С ремонтом и без мебели": [
      { name: "дизайнерский ремонт", img: img1 },
      { name: "евроремонт", img: img2 },
      { name: "косметический ремонт", img: img3 },
      { name: "старый ремонт", img: img4 },
    ],
    "Без ремонта": [
      { name: "предчистовая отделка", img: img9 },
      { name: "средняя отделка", img: img10 },
      { name: "черновая отделка", img: img11 },
    ],
  };
  return (
    <div>
      <div className="relative sm:w-full">
        <DropdownMenu
          name={"renovationType"}
          value={values.renovationType}
          options={renovationTypes}
          max_len={40}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:gap-4 py-4">
        {values.renovationType === ""
          ? null
          : variants[values.renovationType].map((type) => (
              <label
                key={type.img.toString()}
                className="border-gray relative h-full"
              >
                <img
                  src={type.img}
                  alt=""
                  className="rounded-tr-xl rounded-tl-xl"
                />
                <div className="bg-white p-2 h-16 lg:h-auto text-center font-semibold rounded-bl-lg rounded-br-lg dark:bg-dark-600 dark:text-dark-200">
                  {type.name}
                </div>
                <Field
                  name="renovationTypePicked"
                  type="radio"
                  className="absolute top-2 right-2"
                  value={type.name}
                />
              </label>
            ))}
      </div>
    </div>
  );
}
