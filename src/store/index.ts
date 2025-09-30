import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import carReducer from "./slices/carSlice";
import bookingReducer from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
    bookings: bookingReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
