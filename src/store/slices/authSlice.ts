import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
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
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
      state.expiresAt = action.payload.expiresAt;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      state.expiresAt = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
