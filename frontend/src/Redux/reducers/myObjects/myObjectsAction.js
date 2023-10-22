import {createAction} from "@reduxjs/toolkit";

export const addObject = createAction('myObjects/addObject')
export const setMainFilter = createAction('myObjects/setMainFilter')
export const setAdditionalFilter = createAction('myObjects/setAdditionalFilter')
