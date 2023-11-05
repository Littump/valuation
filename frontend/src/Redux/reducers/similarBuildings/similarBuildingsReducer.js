import { createReducer } from "@reduxjs/toolkit";
import {
  deleteObjects,
  goToObject,
  setIsOpen,
  setObject,
} from "./similarBuildingsAction";

const initialState = {
  buildings: [],
};

export default createReducer(initialState, (builder) => {
  builder.addCase(goToObject, (state, action) => {
    let house = state.buildings.find((el) => el.id === action.id);
    state.buildings.forEach((building) => {
      building.isOpen = false;
    });
    house.isOpen = true;
  });
  builder.addCase(setIsOpen, (state, action) => {
    let house = state.buildings.find((el) => el.id === action.id);
    house.isOpen = !house.isOpen;
  });
  builder.addCase(setObject, (state, action) => {
    state.buildings.push(action.object);
  });
  builder.addCase(deleteObjects, (state, action) => {
    state.buildings = [];
  });
});
