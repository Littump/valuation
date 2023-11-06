import { createAction } from "@reduxjs/toolkit";

export const addObject = createAction("myObjects/addObject");
export const setIsOpen = createAction("myObjects/setIsOpen");
export const setAdditionalFilter = createAction(
  "myObjects/setAdditionalFilter"
);
export const deleteObjects = createAction("myObjects/deleteObjects");
export const deleteObject = createAction("myObjects/deleteObject");
