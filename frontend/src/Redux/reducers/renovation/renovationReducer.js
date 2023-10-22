import { createReducer } from "@reduxjs/toolkit";
import {
  addImage,
  deleteImage,
  setRenovationType,
} from "./renovationAction.js";

const initialState = {
  images: [],
  renovationTypeX: "",
  renovationTypeY: "",
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addImage, (state, action) => {
      state.images = [...state.images, action.file];
    })
    .addCase(deleteImage, (state, action) => {
      state.images = state.images.filter(
        (file) => file.path !== action.fileName
      );
    })
    .addCase(setRenovationType, (state, action) => {
      /*получаем с сервера ответ где-то*/
      state.renovationTypeX = action.renovationTypeX;
      state.renovationTypeY = action.renovationTypeY;
    });
});
