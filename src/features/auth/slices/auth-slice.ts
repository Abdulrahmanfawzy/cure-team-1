import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateType {
  isAuthenticated: boolean;
}

const initialState: AuthStateType = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
