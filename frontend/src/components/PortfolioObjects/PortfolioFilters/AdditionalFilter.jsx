import { Field } from "formik";
import { useDispatch } from "react-redux";
import { Tag } from "../../UI/Button/Button.jsx";

export default function AdditionalFilter({ filter }) {
  const dispatch = useDispatch();
  const setFilter = (filter) => {
    dispatch({ type: "myObjects/setAdditionalFilter", filter: filter });
  };
  return (
    <div className="flex gap-2 flex-col sm:flex-row mx-auto w-56 sm:mx-0 sm:w-auto">
      <label>
        <Field
          type="checkbox"
          name="additionalFilter"
          value="низкая"
          className="hidden"
          onClick={() => setFilter("низкая")}
        />
        <Tag active={filter.indexOf("низкая") !== -1}>низкая ликвидность</Tag>
      </label>
      <label>
        <Field
          type="checkbox"
          name="additionalFilter"
          value="средняя"
          className="hidden"
          onClick={() => setFilter("средняя")}
        />
        <Tag active={filter.indexOf("средняя") !== -1}>средняя ликвидность</Tag>
      </label>
      <label>
        <Field
          onClick={() => setFilter("высокая")}
          type="checkbox"
          name="additionalFilter"
          value="высокая"
          className="hidden"
        />
        <Tag active={filter.indexOf("высокая") !== -1}>высокая ликвидность</Tag>
      </label>
    </div>
  );
}
