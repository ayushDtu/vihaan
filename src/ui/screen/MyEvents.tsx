import { useAuthGuard } from "../../domain/useAuthGuard";
import { TextView } from "../components/TextView";

export const MyEvents = () => {
  useAuthGuard();
  // todo should list all events that I've got ticket for
  return <TextView text="My Events" />;
};
