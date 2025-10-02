import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
}

interface AuthState {
  loggedIn: boolean;
  user: User | null;
  expiresAt: number | null;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.expiresAt = Date.now() + 10 * 60 * 1000;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.expiresAt = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
