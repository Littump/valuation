import { createReducer } from "@reduxjs/toolkit";
import { copyFilters, setFilters, setGraphData } from "./graphsAction.js";

const initialState = {
  firstGraphFilters: {
    axiosX: "площадь",
    axiosY: "цена",
    floor: {
      min: 1,
      max: 200,
    },
    floors: {
      min: 1,
      max: 200,
    },
    area: {
      min: 1,
      max: 500,
    },
    date: {
      min: 1900,
      max: 2023,
    },
    price: {
      min: 1,
      max: 500,
    },
    metroMin: {
      min: 0,
      max: 60,
    },
    roomsNumber: {
      min: 1,
      max: 20,
    },
    region: "Любой",
    houseType: "Любой",
    houseMaterial: "Любой",
    metroName: "",
    district: "",
    repairType: "Любой",
  },
  secondGraphFilters: {
    axiosX: "площадь",
    axiosY: "цена",
    floor: {
      min: 1,
      max: 200,
    },
    floors: {
      min: 1,
      max: 200,
    },
    area: {
      min: 1,
      max: 500,
    },
    date: {
      min: 1900,
      max: 2023,
    },
    price: {
      min: 1,
      max: 500,
    },
    metroMin: {
      min: 0,
      max: 60,
    },
    roomsNumber: {
      min: 1,
      max: 20,
    },
    region: "Любой",
    houseType: "Любой",
    houseMaterial: "Любой",
    metroName: "",
    district: "",
    repairType: "Любой",
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
