import { createReducer } from "@reduxjs/toolkit";
import {
  setBuildingInfo,
  setBuildingInfoResponse,
  setCost,
  setHouseCoordinates,
  setInfrastructure,
} from "./getAnalysisAction.js";

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
  buildingInfoResponse: {
    hot_water: null,
    year: null,
    gas: null,
    count_entrances: null,
  },
  infrastructure: {},
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setBuildingInfo, (state, action) => {
      state.buildingInfo = action.buildingInfo;
    })
    .addCase(setBuildingInfoResponse, (state, action) => {
      state.buildingInfoResponse = action.buildingInfoResponse;
    })
    .addCase(setHouseCoordinates, (state, action) => {
      state.coordinates = action.coordinates;
    })
    .addCase(setInfrastructure, (state, action) => {
      state.infrastructure = action.infrastructure;
    })
    .addCase(setCost, (state, action) => {
      state.realCost = (
        action.cost *
        (Math.random() * (0.98 - 0.95) + 0.95)
      ).toFixed(2);
      state.marketCost = action.cost.toFixed(2);
    });
});
