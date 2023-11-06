import { Form, Formik } from "formik";
import AdditionalFilter from "./AdditionalFilter.jsx";

export default function PortfolioFilters() {
  return (
    <div className="flex flex-col gap-2">
      <Formik
        initialValues={{
          additionalFilter: ["низкая", "средняя", "высокая"],
        }}
        onSubmit={() => {}}
      >
        {({ values }) => {
          return (
            <Form>
              <div className="flex flex-wrap gap-4 mt-4">
                {/* <MainFilter filter={values.mainFilter}/> */}
                <AdditionalFilter filter={values.additionalFilter} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
