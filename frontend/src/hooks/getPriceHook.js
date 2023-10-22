import { useMutation } from "react-query";
import getPriceService from "../services/getPriceService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const getPriceHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (buildingInfo) => {
      return getPriceService.getPrice(buildingInfo);
    },
    onSuccess: (data) => {
      dispatch({
        type: "analysis/setCost",
        cost: Math.round(data?.data?.price) / 1000000,
      });
      navigate("/analysis");
    },
    onError: () => {
      dispatch({
        type: "analysis/setCost",
        cost: "неизвестно",
      });
      navigate("/analysis");
    },
  });
};
