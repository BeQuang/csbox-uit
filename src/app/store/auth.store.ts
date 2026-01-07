import { create } from "zustand";
import { User } from "@/types/auth";
import { ROLES } from "@/utils/role";
import { store } from "@/app/redux/store";
import { setAuthenticated } from "@/app/redux/auth.slice";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const MOCK_USERS = [
  { id: 1, username: "admin", password: "admin123", role: ROLES.ADMIN },
  { id: 2, username: "staff", password: "staff123", role: ROLES.STAFF },
  { id: 3, username: "user", password: "user123", role: ROLES.USER },
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (username, password) => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return false;

    set({
      isAuthenticated: true,
      user: { id: found.id, username: found.username, role: found.role },
    });

    // 👉 sync redux
    store.dispatch(setAuthenticated(true));

    return true;
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
    store.dispatch(setAuthenticated(false));
  },
}));
