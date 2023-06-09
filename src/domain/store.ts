import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  clearStore: () => void;
}

const initialState = {
  token: undefined,
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      ...initialState,
      setToken: (token: string | undefined) => set({ token }),
      clearStore: () => set(initialState),
    }),
    {
      name: "ticket-ethprague23",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated);

  useEffect(() => {
    const unsubFinishHydration = useStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

export const tokenSelector = (state: State) => state.token;
export const setTokenSelector = (state: State) => state.setToken;
