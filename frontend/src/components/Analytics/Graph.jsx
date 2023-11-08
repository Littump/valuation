import { Chart, registerables } from "chart.js";
import { Bar, Scatter } from "react-chartjs-2";
import { BlackButton, Button } from "../UI/Button/Button.jsx";
import GraphFilters from "./GraphFilters.jsx";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getGraphHook } from "../../hooks/getGraphHook.js";
import Loading from "../UI/Loading/Loading.jsx";
import getRegionName from "../../functions/getRegionName.js";
import getHouseMaterialReversed from "../../functions/getHouseMaterialReversed.js";
import getObjectTypeReversed from "../../functions/getObjectTypeReversed.js";
import getRepairName from "../../functions/getRepairName.js";
import getRoomsNumberReversed from "../../functions/getRoomsNumberReversed.js";
import { useEffect } from "react";
import getParkingTypeReversed from "../../functions/getParkingTypeReversed.js";
Chart.register(...registerables);

export default function Graph({ bgColor = "rgba(0,0,0,0.3)", num, type }) {
  const { mutate, isLoading } = getGraphHook(num);
  const otherFilters = useSelector((state) => {
    if (num === 2) return state.graphs.firstGraphFilters;
    else return state.graphs.secondGraphFilters;
  });
  const graphData = useSelector((state) => {
    if (num === 1) return state.graphs.firstGraphData;
    else return state.graphs.secondGraphData;
  });
  const dispatch = useDispatch();

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  let copy = (number) => {
    dispatch({ type: "graphs/copyFilters", number: number });
  };
  return (
    <Formik
      initialValues={{
        axiosX: "площадь",
        axiosY: "цена",
        axiosColumn: "регион",
        floor: {
          min: 1,
          max: 200,
        },
        floors: {
          min: 1,
          max: 200,
        },
        area: {
          min: 1,
          max: 500,
        },
        date: {
          min: 1900,
          max: 2023,
        },
        price: {
          min: 1,
          max: 500,
        },
        metroMin: {
          min: 0,
          max: 60,
        },
        roomsNumber: {
          min: 0,
          max: 20,
        },
        region: "Любой",
        houseType: "Любой",
        houseMaterial: "Любой",
        metroName: "",
        district: "",
        repairType: "Любой",
        isColumn: false,
      }}
      onSubmit={(values) => {
        mutate({ values, type }); //all || user
        dispatch({ type: "graphs/setFilters", number: num, filters: values });
      }}
    >
      {({ values, setFieldValue, setValues }) => {
        let labels = graphData.map((el) => el.label);
        if (graphData[0]?.label == 'msc') {
          labels = labels.map((el) => getRegionName(el));
        } else if (graphData[0]?.label == 'mlc') {
          labels = labels.map((el) => getHouseMaterialReversed(el));
        } else if (graphData[0]?.label == '1') {
          labels = labels.map((el) => getObjectTypeReversed(el));
        } else if (graphData[0]?.label == '0.7') {
          labels = labels.map((el) => getRoomsNumberReversed(parseInt(el)));
        } else if (graphData[0]?.label == 'mlt') {
          labels = labels.map((el) => getParkingTypeReversed(el));
        }else if (graphData[0]?.label == '2;2') {
          labels = labels.map((el) => {
            return getRepairName(parseInt(el[0]), parseInt(el[2]));
          });
        }
        useEffect(() => {
          dispatch({ type: "graphs/setFilters", number: num, filters: values });
       }, [values]);
        return (
          <Form className="flex flex-col gap-8 my-10 items-center">
             {/* <FormObserver values={values} number={num} /> */}
            <div className="bg-light-gray p-10 rounded-xl flex flex-col items-center gap-6 dark:bg-dark-400 dark:border dark:border-dark-300">
              <div className="w-full">
                {values.isColumn ? (
                  <Bar
                    options={chartOptions}
                    className="dark:bg-dark-600 rounded-lg"
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: "Количество квартир",
                          data: graphData.map((el) => el.value),
                          backgroundColor: bgColor,
                        },
                      ],
                    }}
                  />
                ) : (
                  <Scatter
                    options={scatterOptions}
                    className="dark:bg-dark-600 rounded-lg"
                    data={{
                      datasets: [
                        {
                          label:
                            "Зависимость " +
                            values.axiosY +
                            " от " +
                            values.axiosX,
                          data: graphData.map((el) => ({
                            x: el[0],
                            y: el[1],
                          })),
                          backgroundColor: bgColor,
                        },
                      ],
                    }}
                  />
                )}
                <div className="mt-4 w-40 sm:max-w-[80vw] flex sm:flex-row flex-col mx-auto lg:mx-0 gap-1 bg-white sm:w-fit p-1 rounded-lg border-gray dark:bg-dark-600 dark:text-dark-200">
                  <div
                    className={
                      "h-full rounded-lg py-1 px-2 transition cursor-pointer " +
                      (values.isColumn &&
                        "bg-black text-white dark:bg-dark-500 dark:text-dark-100")
                    }
                    onClick={() => setFieldValue("isColumn", true)}
                  >
                    столбчатый
                  </div>
                  <div
                    className={
                      "h-full rounded-lg py-1 px-2 transition cursor-pointer " +
                      (!values.isColumn &&
                        "bg-black text-white dark:bg-dark-500 dark:text-dark-100")
                    }
                    onClick={() => setFieldValue("isColumn", false)}
                  >
                    точечный
                  </div>
                </div>
              </div>

              <GraphFilters
                values={values}
                setFieldValue={setFieldValue}
                theme={num === 1 ? "primary" : "error"}
              />
              <div className="w-52 text-center">
                {isLoading ? (
                  <BlackButton>
                    <Loading />
                  </BlackButton>
                ) : (
                  <button type="submit" className="w-full text-center h-full">
                    <BlackButton>Применить</BlackButton>
                  </button>
                )}
                  <button
                    type="button"
                    className="w-full h-full"
                    onClick={() => {
                      copy(num);
                      setValues({
                        axiosX: otherFilters.axiosX,
                        axiosY: otherFilters.axiosY,
                        floor: { ...otherFilters.floor },
                        floors: { ...otherFilters.floors },
                        area: { ...otherFilters.area },
                        date: { ...otherFilters.date },
                        price: { ...otherFilters.price },
                        metroMin: { ...otherFilters.metroMin },
                        roomsNumber: { ...otherFilters.roomsNumber },
                        region: otherFilters.region,
                        houseType: otherFilters.houseType,
                        metroName: otherFilters.metroName,
                        repairType: otherFilters.repairType,
                        houseMaterial: otherFilters.houseMaterial,
                        district: otherFilters.district,
                        activeFilter: otherFilters.activeFilter,
                        axiosColumn: otherFilters.axiosColumn,
                        isColumn: otherFilters.isColumn,
                      });
                    }}
                  >
                    <Button>
                    Скопировать {num === 1 ? "из 2" : "из 1"}
                    </Button>
                  </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
