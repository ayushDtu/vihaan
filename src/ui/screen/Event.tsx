import { useLocalSearchParams } from "expo-router";

import { useEvent } from "../../domain/useEvents";
import { TextView } from "../components/TextView";

export const Event = () => {
  const { id } = useLocalSearchParams();
  const { event } = useEvent(id as string);
  if (!event) {
    return <TextView text="event does not exist :C" />;
  }
  return <TextView text={event.title} />;
};
