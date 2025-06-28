import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user-info"))
      : null,
  login: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user-info");
    Cookies.remove("user-info");
    set({ user: null });
  },
  setUser: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
