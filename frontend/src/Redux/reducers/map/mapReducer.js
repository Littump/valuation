import { createReducer } from "@reduxjs/toolkit";
import { setFilter, setMapCenter } from "./mapAction.js";

const initialState = {
  activeFilter: "Этот дом",
  buildingInfo: [
    {
      heading: "Ближайшее метро",
      info: "Лесная",
    },
    {
      heading: "Ближайший трк",
      info: "Европолис",
    },
  ],
};

export default createReducer(initialState, (builder) => {
  builder.addCase(setMapCenter, (state, action) => {
    state.mapCenter = action.center;
  });
  builder.addCase(setFilter, (state, action) => {
    state.activeFilter = action.filter;
  });
});
