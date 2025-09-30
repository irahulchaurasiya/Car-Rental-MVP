import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  images: string[];
  seats: number;
  transmission: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;
