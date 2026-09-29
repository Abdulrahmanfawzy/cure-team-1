import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authStorage } from "../utils/auth-storage";

export interface AuthStateType {
  isAuthenticated: boolean;
}

const initialState: AuthStateType = {
  isAuthenticated: !!authStorage.getAccessToken(),
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
