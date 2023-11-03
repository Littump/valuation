import { createReducer } from "@reduxjs/toolkit";
import { setFilter, setMapCenter } from "./mapAction.js";

const initialState = {
  activeFilter: "Этот дом",
  buildings: {
    metro: ["Лесная", "Площадь мужества"],
    otherObjects: ["Музей чего-то", "Медный всадник"],
  },
};

export default createReducer(initialState, (builder) => {
  builder.addCase(setMapCenter, (state, action) => {
    state.mapCenter = action.center;
  });
  builder.addCase(setFilter, (state, action) => {
    state.activeFilter = action.filter;
  });
});
