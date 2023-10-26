import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

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
            return sum + +(object.liquidity === "низкая");
          }, 0),
          objects.reduce((sum, object) => {
            return sum + +(object.liquidity === "средняя");
          }, 0),
          objects.reduce((sum, object) => {
            return sum + +(object.liquidity === "высокая");
          }, 0),
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full bg-light-gray rounded-xl overflow-hidden flex flex-col justify-between py-4 items-center dark:bg-dark-600">
      <div className="text-xl text-black font-semibold mt-4 dark:text-dark-100">
        Ликвидность объектов в портфеле
      </div>
      <div className="w-9/12 dark:text-dark-100">
        <Doughnut data={data} />
      </div>
    </div>
  );
}