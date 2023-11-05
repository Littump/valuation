import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import getRenovationTypeService from "../services/getRenovationTypeService";
import getRepairName from "../functions/getRepairName";

export const getRenovationTypeHook = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.renovation.images);

  return useMutation({
    mutationFn: () => getRenovationTypeService.getRenovationType(images),
    onSuccess: (data) => {
      console.log(data);
      let renovationType = getRepairName(
        parseInt(data.data.repair[0]),
        parseInt(data.data.repair[2])
      );
      dispatch({
        type: "renovation/setRenovationType",
        renovationTypeX: renovationType[0],
        renovationTypeY: renovationType[1],
      });
    },
    onError: () => {
      dispatch({
        type: "renovation/setRenovationType",
        renovationType: "неизвестно",
      });
    },
  });
};
