import { useQuery } from "react-query";
import userBuildingsService from "../services/userBuildingsService";

export const getBuildingsHook = () => {
  return useQuery(["getBuildings"], () => userBuildingsService.getBuildings());
};
