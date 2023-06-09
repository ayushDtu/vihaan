import { useRouter } from "expo-router";
import { useEffect } from "react";

import { paths } from "./paths";
import { tokenSelector, useStore } from "./store";

export const useAuthGuard = () => {
  const router = useRouter();
  const token = useStore(tokenSelector);
  useEffect(() => {
    if (!token) {
      router.push(paths.root);
    }
  }, [router, token]);
};
