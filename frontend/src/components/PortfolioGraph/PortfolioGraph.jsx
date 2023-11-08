import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Heading from "../UI/Heading/Heading";

export default function PortfolioGraph() {
  let objects = useSelector((state) => state.myObjects.objects);
  ChartJS.register(ArcElement, Tooltip, Legend);
  let data = {
    labels: ["низкая ", "средняя", "высокая"],
    datasets: [
      {
        label: "объектов",
        backgroundColor: ["#E55C5C", "#476BF0", "#6A9F48"],
        data: [
          objects.reduce((sum, object) => {
            return sum + +(object.liquidity === 'низкая');
          }, 0),
          objects.reduce((sum, object) => {
            return (
              sum +
              +(
                object.liquidity === "средняя"
              )
            );
          }, 0),
          objects.reduce((sum, object) => {
            return sum + +(object.liquidity === 'высокая');
          }, 0),
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins:{
      legend:{
        labels:{
          font: "'Proxima Nova', sans-serif",
          color : "#000000",
          weight:'600'
        }
      }
    }
  }

  if (objects.length === 0) {
    return (
      <div className="h-full px-20 bg-light-gray rounded-xl overflow-hidden flex flex-col justify-center py-8 items-center dark:bg-dark-600">
        <Heading>Добавьте в портфель объекты, чтобы увидеть аналитику</Heading>
      </div>
    );
  }
  return (
    <div className="h-full bg-light-gray rounded-xl overflow-hidden flex flex-col justify-between py-8 items-center dark:bg-dark-600">
      <div className="text-xl text-black font-semibold mt-4 dark:text-dark-100">
        Ликвидность объектов в портфеле
      </div>
      <div className="w-9/12 dark:text-dark-100">
        <Doughnut data={data} options={options}/>
      </div>
    </div>
  );
}
