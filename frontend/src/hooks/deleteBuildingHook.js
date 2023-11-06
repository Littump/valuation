import { useMutation } from "react-query";
import userBuildingsService from "../services/userBuildingsService";

export const deleteBuildingHook = () => {
  return useMutation({
    mutationFn: (id) => userBuildingsService.deleteBuilding(id),
    onSuccess: (data) => {},
  });
};
