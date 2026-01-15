import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth";

// Dạng dữ liệu trong Redux store cho auth
interface AuthReduxState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthReduxState = {
  isAuthenticated: false,
  user: null,
};

// Tạo slice cho auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hành động khi đăng nhập thành công
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Hành động khi đăng xuất
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
