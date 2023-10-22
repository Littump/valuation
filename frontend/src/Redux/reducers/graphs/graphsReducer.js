import { createReducer } from "@reduxjs/toolkit";
import { copyFilters, setFilters, setGraphData } from "./graphsAction.js";

const initialState = {
  firstGraphFilters: {
    axiosX: "площадь",
    axiosY: "цена",
    tags: "",
    floor: [1, 200],
    floors: [1, 200],
    area: [1, 500],
    date: [1900, 2023],
    price: [1, 500],
    metroMin: [0, 60],
    roomsNumber: [1, 20],
    region: "МОСКВА",
    activeFilter: "Всего комнат",
  },
  secondGraphFilters: {
    axiosX: "площадь",
    axiosY: "цена",
    tags: "",
    floor: [1, 200],
    floors: [1, 200],
    area: [1, 500],
    date: [1900, 2023],
    price: [1, 500],
    metroMin: [0, 60],
    roomsNumber: [1, 20],
    region: "МОСКВА",
    activeFilter: "Всего комнат",
  },
  firstGraphData: [],
  secondGraphData: [],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setFilters, (state, action) => {
      if (action.number === 1) {
        state.firstGraphFilters = { ...action.filters };
      } else {
        state.secondGraphFilters = { ...action.filters };
      }
    })
    .addCase(copyFilters, (state, action) => {
      if (action.number === 1) {
        state.firstGraphFilters = { ...state.secondGraphFilters };
        state.firstGraphData = [...state.secondGraphData];
      } else {
        state.secondGraphFilters = { ...state.firstGraphFilters };
        state.secondGraphData = [...state.firstGraphData];
      }
    })
    .addCase(setGraphData, (state, action) => {
      if (action.number === 1) {
        state.firstGraphData = [...action.objects];
      } else {
        state.secondGraphData = [...action.objects];
      }
    });
});
