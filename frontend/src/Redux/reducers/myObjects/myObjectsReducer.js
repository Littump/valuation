import { createReducer } from "@reduxjs/toolkit";
import {
  addObject,
  setAdditionalFilter,
  setMainFilter,
} from "./myObjectsAction.js";

const initialState = {
  objects: [
    {
      tag: null,
      address: null,
      houseType: null,
      description: null,
      flatType: null,
      square: null,
      roomsNumber: null,
      floor: null,
      id: null,
      renovationType: null,
      renovationTypePicked: null,
      cost: null,
      liquidity: null,
    },
  ],
  mainFilter: "",
  additionalFilter: ["низкая", "средняя", "высокая"],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addObject, (state, action) => {
      let index = state.objects.find(
        (el) => el.address === action.buildingInfo.address
      );
      if (index === undefined) {
        console.log(action);
        state.objects.push({
          ...action.buildingInfo,
          liquidity:
            action.buildingInfo.area % 3 === 0
              ? "высокая"
              : action.buildingInfo.area % 3 === 1
              ? "средняя"
              : "низкая",
          id: state.objects[state.objects.length - 1].id + 1,
          cost: (action.buildingInfo.real_price / 1000000).toFixed(2),
        });
      } else {
        console.log(index);
      }
    })
    .addCase(setMainFilter, (state, action) => {
      state.mainFilter = action.filter;
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
