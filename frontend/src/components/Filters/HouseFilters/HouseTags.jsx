import { Field } from "formik";
import { Tag } from "../../UI/Button/Button.jsx";

export default function HouseTags({ value, options, name }) {
  return (
    <>
      {options.map((option) => {
        return (
          <label key={option} className="w-full sm:w-auto ">
            <Field type="radio" name={name} value={option} className="hidden" />
            <Tag active={value === option}>{option}</Tag>
          </label>
        );
      })}
    </>
  );
}
