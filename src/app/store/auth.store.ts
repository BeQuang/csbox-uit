import { create } from "zustand";
import { ROLES } from "@/utils/role";
import { store } from "@/app/redux/store";
import { loginSuccess, logout as logoutRedux } from "@/app/redux/auth.slice";

const MOCK_USERS = [
  { id: 1, username: "admin", password: "admin123", role: ROLES.ADMIN },
  { id: 2, username: "staff", password: "staff123", role: ROLES.STAFF },
  { id: 3, username: "user", password: "user123", role: ROLES.USER },
];

interface AuthActions {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthActions>(() => ({
  login: (username, password) => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return false;

    store.dispatch(
      loginSuccess({
        id: found.id,
        username: found.username,
        role: found.role,
      })
    );

    return true;
  },

  logout: () => {
    store.dispatch(logoutRedux());
  },
}));
