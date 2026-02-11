import { create } from "zustand";
import { Role, ROLES } from "@/utils/role";
import { store } from "@/app/redux/store";
import { loginSuccess, logout as logoutRedux } from "@/app/redux/auth.slice";

let mockUsers = [
  { id: 1, username: "admin", password: "admin123", role: ROLES.ADMIN },
  { id: 2, username: "staff", password: "staff123", role: ROLES.STAFF },
  { id: 3, username: "user", password: "user123", role: ROLES.USER },
];

interface AuthActions {
  login: (
    username: string,
    password: string,
    toast: (msg: string, type?: "success" | "error") => void,
  ) => boolean;
  register: (payload: { username: string; password: string; role: Role }) => {
    success: boolean;
    message: string;
  };
  logout: () => void;
}

export const useAuthStore = create<AuthActions>(() => ({
  login: (username, password, toast) => {
    const found = mockUsers.find(
      (u) => u.username === username && u.password === password,
    );
    if (!found) {
      toast("Sai tài khoản hoặc mật khẩu", "error");
      return false;
    }
    store.dispatch(
      loginSuccess({
        id: found.id,
        username: found.username,
        role: found.role,
      }),
    );
    toast("Đăng nhập thành công", "success");

    return true;
  },

  register: ({ username, password, role }) => {
    const normalizedUsername = username.trim().toLowerCase();

    if (!normalizedUsername) {
      return { success: false, message: "Tên đăng nhập không hợp lệ" };
    }

    const exists = mockUsers.some((u) => u.username === normalizedUsername);
    if (exists) {
      return { success: false, message: "Tên đăng nhập đã tồn tại" };
    }

    const newUser = {
      id: mockUsers.length + 1,
      username: normalizedUsername,
      password,
      role,
    };

    mockUsers = [...mockUsers, newUser];

    store.dispatch(
      loginSuccess({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      }),
    );

    return { success: true, message: "Đăng ký thành công" };
  },

  logout: () => {
    store.dispatch(logoutRedux());
  },
}));
