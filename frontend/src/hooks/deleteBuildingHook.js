import { useMutation } from "react-query";
import userBuildingsService from "../services/userBuildingsService";

export const deleteBuildingHook = () => {
  return useMutation({
    mutationFn: (address) => userBuildingsService.deleteBuilding(address),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
