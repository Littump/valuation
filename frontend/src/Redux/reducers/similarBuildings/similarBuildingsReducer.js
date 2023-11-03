import { createReducer } from "@reduxjs/toolkit";
import { goToObject, setIsOpen } from "./similarBuildingsAction";

const initialState = {
  buildings: [
    {
      address: "Г.Москва, Ул Пушкина дом 2 квартира 112",
      marketCost: "9.8",
      realCost: "9.2",
      id: "1",
      coordinates: [59.97084, 30.38574],
      isOpen: false,
    },
    {
      address: "Г.Москва, Ул Пушкина дом 1 квартира 113",

      marketCost: "5.8",
      realCost: "6.2",
      id: "2",
      coordinates: [59.97062, 30.38572],
      isOpen: false,
    },
    {
      address: "Г.Москва, Ул Пушкина дом 3 квартира 112",
      marketCost: "13.8",
      realCost: "13.6",
      id: "3",
      coordinates: [59.97034, 30.38571],
      isOpen: false,
    },
    {
      address: "Г.Москва, Ул Пушкина дом 4 квартира 112",
      marketCost: "22.8",
      realCost: "17.2",
      id: "4",
      coordinates: [59.97082, 30.38555],
      isOpen: false,
    },
  ],
};

export default createReducer(initialState, (builder) => {
  builder.addCase(goToObject, (state, action) => {
    let id = action.id - 1;
    state.buildings.forEach((building) => {
      building.isOpen = false;
    });
    state.buildings[id].isOpen = true;
  });
  builder.addCase(setIsOpen, (state, action) => {
    let id = action.id - 1;
    state.buildings[id].isOpen = !state.buildings[id].isOpen;
  });
});
