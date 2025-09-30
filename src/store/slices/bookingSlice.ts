import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: number;
  carId: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  extras: string[];
}

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
