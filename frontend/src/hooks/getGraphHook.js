import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import graphsService from "../services/graphsService";

export const getGraphHook = (num) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (values) => graphsService.getGraphData(values),
    onSuccess: (data) => {
      if (num === 1) {
        dispatch({
          type: "graphs/setGraphData",
          objects: data.data,
          number: 1,
        });
      } else {
        dispatch({
          type: "graphs/setGraphData",
          objects: data.data,
          number: 2,
        });
      }
    },
  });
};
