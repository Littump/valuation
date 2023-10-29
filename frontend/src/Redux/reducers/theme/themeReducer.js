import { createAction, createReducer } from "@reduxjs/toolkit";

export const toggleTheme = createAction("theme/toggleTheme");

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

export default createReducer(initialState, (builder) => {
  builder.addCase(toggleTheme, (state) => {
    if (state.theme === "light") state.theme = "dark";
    else state.theme = "light";
  });
});
