import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

export default function MainFilter({ filter }) {
  const dispatch = useDispatch();
  const setFilter = (filter) => {
    dispatch({ type: "myObjects/setMainFilter", filter: filter });
  };
  return (
    <div
      className="border border-gray flex gap-1 p-0.5 rounded-lg dark:bg-dark-800 dark:border-none"
      role="group"
    >
      <label onClick={() => setFilter("")}>
        <Field type="radio" name="mainFilter" value="" className="hidden" />
        <div className={filter === "" ? "filter filterActive" : "filter"}>
          все
        </div>
      </label>
      <label onClick={() => setFilter("Объекты с риском")}>
        <Field
          type="radio"
          name="mainFilter"
          value="Объекты с риском"
          className="hidden"
        />
        <div
          className={
            filter === "Объекты с риском" ? "filter filterActive" : "filter"
          }
        >
          Объекты с риском
        </div>
      </label>
    </div>
  );
}
