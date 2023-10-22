import { Field, Form, Formik } from "formik";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function MapButtons() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.maps.activeFilter);
  let filters = ["Этот дом", "Похожие дома"];
  return (
    <div className="xs:flex xs:flex-col grid grid-cols-1 gap-2">
      <Formik
        initialValues={{
          filter: "house",
        }}
        onSubmit={() => {}}
      >
        {({ values }) => {
          return (
            <Form>
              <LightHeading text="посмотрите важные места" />
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="flex flex-wrap gap-1 xs:w-fit w-full bg-white p-1 rounded-lg dark:bg-dark-400 dark:text-dark-100"
              >
                {filters.map((item) => (
                  <label
                    key={item}
                    className="xs:w-auto w-full text-center xs:text-start"
                    onClick={() =>
                      dispatch({ type: "maps/setFilter", filter: item })
                    }
                  >
                    <Field
                      type="radio"
                      name="filter"
                      value={item}
                      className="hidden"
                    />
                    <div
                      className={
                        item === activeFilter
                          ? "myCheckbox checkboxActive"
                          : "myCheckbox"
                      }
                    >
                      {item}
                    </div>
                  </label>
                ))}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
