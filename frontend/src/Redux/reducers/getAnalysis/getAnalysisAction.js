import { createAction } from "@reduxjs/toolkit";

export const setBuildingInfo = createAction("analysis/setBuildingInfo");
export const setCost = createAction("analysis/setCost");
export const setBuildingInfoResponse = createAction(
  "analysis/setBuildingInfoResponse"
);
export const setHouseCoordinates = createAction("analysis/setHouseCoordinates");
export const setInfrastructure = createAction("analysis/setInfrastructure");
