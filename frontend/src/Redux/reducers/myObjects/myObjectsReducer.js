import { createReducer } from "@reduxjs/toolkit";
import {
  addObject,
  deleteObject,
  deleteObjects,
  setAdditionalFilter,
  setIsOpen,
} from "./myObjectsAction.js";

const initialState = {
  objects: [],
  mainFilter: "",
  additionalFilter: ["низкая", "средняя", "высокая"],
};

export default createReducer(initialState, (builder) => {
  builder.addCase(addObject, (state, action) => {
    state.objects.push(action.objectInfo);
  });
  builder
    .addCase(setIsOpen, (state, action) => {
      let house = state.objects.find((el) => el.id === action.id);
      house.isOpen = !house.isOpen;
    })
    .addCase(deleteObject, (state, action) => {
      state.objects = [...state.objects.filter((el) => el.id !== action.id)];
    })
    .addCase(deleteObjects, (state, action) => {
      state.objects = [];
    })
    .addCase(setAdditionalFilter, (state, action) => {
      let index = state.additionalFilter.indexOf(action.filter);
      if (index !== -1) {
        state.additionalFilter = state.additionalFilter.filter(
          (el) => el !== action.filter
        );
      } else {
        state.additionalFilter = [...state.additionalFilter, action.filter];
      }
    });
});
