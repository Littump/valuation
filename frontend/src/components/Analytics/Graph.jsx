import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BlackButton, Button } from "../UI/Button/Button.jsx";
import GraphFilters from "./GraphFilters.jsx";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getGraphHook } from "../../hooks/getGraphHook.js";
import Loading from "../UI/Loading/Loading.jsx";
import getGraphType from "../../functions/getGraphType.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Graph({
  bgColor = "rgba(0,0,0,0.3)",
  borderColor = "rgba(0,0,0,0.7)",
  num,
  type,
}) {
  const { mutate, isLoading } = getGraphHook(num);
  const otherFilters = useSelector((state) => {
    if (num === 2) return state.graphs.firstGraphFilters;
    else return state.graphs.secondGraphFilters;
  });
  const graphData = useSelector((state) => {
    if (num === 1) return state.graphs.firstGraphData;
    else return state.graphs.secondGraphData;
  });
  const axiosX = useSelector((state) => {
    if (num === 1) return state.graphs.firstGraphFilters.axiosX;
    else return state.graphs.secondGraphFilters.axiosX;
  });
  const axiosY = useSelector((state) => {
    if (num === 1) return state.graphs.firstGraphFilters.axiosY;
    else return state.graphs.secondGraphFilters.axiosY;
  });
  const dispatch = useDispatch();
  // по каким параметрам строим график:

  const options = {
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
        tags: "",
        floor: [1, 200],
        floors: [1, 200],
        area: [1, 500],
        date: [1900, 2023],
        price: [1, 500],
        metroMin: [0, 60],
        roomsNumber: [1, 20],
        region: "Любой",
        houseType: "Любой",
        houseMaterial: "Любой",
        metroName: "",
        activeFilter: "Всего комнат",
        repairType: "Любой",
      }}
      onSubmit={(values) => {
        // отправлем даные в сторе
        dispatch({ type: "graphs/setFilters", number: num, filters: values });
        // отправляем запрос
        mutate({ values, type }); //all || user
      }}
    >
      {({ values, setFieldValue, setValues }) => {
        return (
          <Form className="flex flex-col gap-8 my-10 items-center">
            <div className="bg-light-gray p-10 rounded-xl flex flex-col items-center gap-6 dark:bg-dark-400 dark:border dark:border-dark-300">
              <Line
                options={options}
                data={{
                  labels: graphData?.map(
                    (el) => el[getGraphType(values.axiosX)]
                  ),
                  datasets: [
                    {
                      label: "зависимость " + axiosY + " от " + axiosX,
                      fill: true,
                      data: graphData?.map(
                        (el) => el[getGraphType(values.axiosY)]
                      ),
                      borderColor: borderColor,
                      backgroundColor: bgColor,
                    },
                  ],
                }}
                className="dark:bg-dark-600 rounded-lg"
              />
              <GraphFilters
                values={values}
                setFieldValue={setFieldValue}
                theme={num === 1 ? "primary" : "error"}
              />
              <div className="w-52 text-center">
                <BlackButton>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <button type="submit" className="w-full h-full">
                      Применить
                    </button>
                  )}
                </BlackButton>
                <Button>
                  <button
                    type="button"
                    className="w-full h-full"
                    onClick={() => {
                      copy(num);
                      // formik values ставим тоже
                      setValues({
                        axiosX: otherFilters.axiosX,
                        axiosY: otherFilters.axiosY,
                        tags: otherFilters.tags,
                        floor: otherFilters.floor,
                        floors: otherFilters.floors,
                        area: otherFilters.area,
                        date: otherFilters.date,
                        price: otherFilters.price,
                        metroMin: otherFilters.metroMin,
                        roomsNumber: otherFilters.roomsNumber,
                        region: otherFilters.region,
                        activeFilter: otherFilters.activeFilter,
                      });
                    }}
                  >
                    Скопировать {num === 1 ? "из 2" : "из 1"}
                  </button>
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
