import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth";

interface AuthReduxState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthReduxState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
