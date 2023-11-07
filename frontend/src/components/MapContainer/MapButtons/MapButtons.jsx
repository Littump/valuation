import { Field, Form, Formik } from "formik";
import LightHeading from "../../UI/LightHeading/LightHeading.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function MapButtons() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.maps.activeFilter);
  const similar_objects = useSelector(state=>state.similarBuildings.buildings);
  const infrastructure = useSelector(state=>state.building.infrastructure);
  let infrastructure_sum = 0
  for(var key in infrastructure){
    infrastructure_sum += infrastructure[key].count
  }
  let filters =["Этот дом"];
  if(similar_objects.length !== 0){
    filters.push("Похожие квартиры");
  }
  if(infrastructure_sum !== 0){
    filters.push("Инфраструктура");
  }
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
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="flex flex-wrap gap-1 sm:w-fit w-full bg-white p-1 rounded-lg dark:bg-dark-400 dark:text-dark-100"
              >
                {filters.map((item) => (
                  <label
                    key={item}
                    className="sm:w-auto w-full text-center sm:text-start"
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
