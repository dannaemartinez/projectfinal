import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface authState {
  userName?: string;
  token?: string;
}

const initialState: authState = {
  userName: undefined,
  token: undefined,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      debugger;
      state.userName = action.payload.data.tokenAuth.payload.username;
      state.token = action.payload.data.tokenAuth.token;
    },
    deleteAuth: (state) => {
      state.userName = undefined;
      state.token = undefined;
    },
  },
});

export const { setAuth, deleteAuth } = AuthSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const tokenSelector = (state: RootState) => authSelector(state).token;
export const userNameSelector = (state: RootState) =>
  authSelector(state).userName;

export default AuthSlice.reducer;