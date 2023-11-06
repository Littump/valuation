import { createReducer } from "@reduxjs/toolkit";
import { copyFilters, setFilters, setGraphData } from "./graphsAction.js";

const initialState = {
  firstGraphFilters: {
    axiosX: "площадь",
    axiosY: "цена",
    axiosColumn: "регион",
    isColumn: false,
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
    axiosColumn: "регион",
    isColumn: false,
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
      if (action.chart === 1) {
        if (action.number === 1) {
          let new_data = [];
          for (var key in action.data) {
            new_data.push({ label: key, value: action.data[key] });
          }
          state.firstGraphData = [...new_data];
        } else {
          let new_data = [];
          for (var key in action.data) {
            new_data.push({ label: key, value: action.data[key] });
          }
          state.secondGraphData = [...new_data];
        }
      } else {
        if (action.number === 1) {
          state.firstGraphData = [...action.data];
        } else {
          state.secondGraphData = [...action.data];
        }
      }
    });
});
