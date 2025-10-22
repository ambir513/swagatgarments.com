import { create } from "zustand";

interface UserState {
  id: string;
  name: string;
  image: string | null | undefined;
  role: string;
  email: string;
}

interface UserStore {
  user: UserState | null;
  addUser: (data: UserState) => void;
  clearUser: () => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  addUser: (data) => set({ user: data }),
  clearUser: () => set({ user: null }),
}));
