import { useMutation } from "react-query";
import userBuildingsService from "../services/userBuildingsService";

export const addBuildingHook = () => {
  return useMutation({
    mutationFn: ({ buildingInfo, price }) =>
      userBuildingsService.addBuilding({ buildingInfo, price }),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
