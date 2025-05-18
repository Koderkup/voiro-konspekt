import { create } from "zustand";

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
    set({ user: null });
  },
  setUser: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
