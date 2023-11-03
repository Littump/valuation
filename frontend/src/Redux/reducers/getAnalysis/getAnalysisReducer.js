import { createReducer } from "@reduxjs/toolkit";
import { setBuildingInfo, setCost } from "./getAnalysisAction.js";

const initialState = {
  realCost: null,
  marketCost: null,
  coordinates: [0, 0],
  buildingInfo: {
    tag: null,
    address: null,
    houseType: null,
    description: null,
    flatType: null,
    square: null,
    roomsNumber: null,
    floor: null,
    repair: null,
  },
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setBuildingInfo, (state, action) => {
      state.buildingInfo = action.buildingInfo;
      state.coordinates = [55, 56]; // перенести в setCost
    })
    .addCase(setCost, (state, action) => {
      state.realCost = (
        action.cost * Math.random() * (0.98 - 0.95) +
        0.95
      ).toFixed(1);
      state.marketCost = action.cost.toFixed(2);
    });
});
