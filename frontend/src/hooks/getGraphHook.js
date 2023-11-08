import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import graphsService from "../services/graphsService";

export const getGraphHook = (num) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (values) => graphsService.getGraphData(values),
    onSuccess: (data) => {
      console.log(data)
      if (data?.data?.result?.length >= 1) {
        if (num === 1) {
          dispatch({
            type: "graphs/setGraphData",
            data: data.data.result,
            number: 1,
            chart: 0,
          });
        } else {
          dispatch({
            type: "graphs/setGraphData",
            data: data.data.result,
            number: 2,
            chart: 0,
          });
        }
      } else {
        if (num === 1) {
          dispatch({
            type: "graphs/setGraphData",
            data: data.data,
            number: 1,
            chart: 1,
          });
        } else {
          dispatch({
            type: "graphs/setGraphData",
            data: data.data,
            number: 2,
            chart: 1,
          });
        }
      }
    },
  });
};
