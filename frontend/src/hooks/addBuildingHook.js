import { useMutation } from "react-query";
import userBuildingsService from "../services/userBuildingsService";
import { useSelector } from "react-redux";

export const addBuildingHook = () => {
  const buildingInfo = useSelector((state) => state.building.buildingInfo);
  return useMutation({
    mutationFn: (price) =>
      userBuildingsService.addBuilding({ buildingInfo, price }),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
