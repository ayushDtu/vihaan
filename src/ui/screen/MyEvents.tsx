import { useAuthGuard } from "../../domain/useAuthGuard";
import { TextView } from "../components/TextView";

export const MyEvents = () => {
  useAuthGuard();
  return <TextView text="My Events" />;
};
