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
        Math.round(data.data.interior_style) - 1,
        Math.round(data.data.interior_qual) - 1
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
