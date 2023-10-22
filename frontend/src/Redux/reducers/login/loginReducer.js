import { createReducer } from '@reduxjs/toolkit'
import { login, logOut } from "./loginAction.js";

const initialState = {
    email:null,
    password:null,
    accountType:'guest'
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(login, (state, action) => {
            state.email = action.email;
            state.password = action.password;
            state.accountType = 'analyst';
        })
        .addCase(logOut, (state, action) => {
            state.email = null;
            state.password = null;
            state.accountType = 'guest';
        })
})
