import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

export const LoaderSlice = createSlice({
  name: "Loader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = LoaderSlice.actions;

export const loaderSelector = (state: RootState) => state.loader;
export const loadingSelector = (state: RootState) => loaderSelector(state).loading;

export default LoaderSlice.reducer;