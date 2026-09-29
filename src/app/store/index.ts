import { authReducer } from "@/features/auth/slices/auth-slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/** Application-wide state type derived from the store. */
export type RootState = ReturnType<typeof store.getState>;

/** Typed dispatch for use outside React (sagas, thunks, etc.). */
export type AppDispatch = typeof store.dispatch;
