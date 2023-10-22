import { createReducer } from "@reduxjs/toolkit";
import { setBuildingInfo, setCost } from "./getAnalysisAction.js";

const initialState = {
  realCost: null,
  marketCost: "23",
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
    })
    .addCase(setCost, (state, action) => {
      state.realCost = action.cost.toFixed(2);
      state.marketCost = (action.cost * 0.97).toFixed(1);
    });
});
