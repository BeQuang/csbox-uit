import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthReduxState {
  isAuthenticated: boolean;
}

const initialState: AuthReduxState = {
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
export default authSlice.reducer;
