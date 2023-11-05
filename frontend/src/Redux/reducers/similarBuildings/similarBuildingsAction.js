import { createAction } from "@reduxjs/toolkit";

export const setIsOpen = createAction("similarBuildings/setIsOpen");
export const goToObject = createAction("similarBuildings/goToObject");
export const setObject = createAction("similarBuildings/setObject");
export const deleteObjects = createAction("similarBuildings/deleteObjects");
