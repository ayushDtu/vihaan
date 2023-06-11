import { useLocalSearchParams } from "expo-router";
import { View, useWindowDimensions } from "react-native";

import { useEvent } from "../../domain/useEvents";
import { EventItem } from "../components/EventItem";
import { TextView } from "../components/TextView";

export const Event = () => {
  const { id } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const { event } = useEvent(id as string);

  if (!event) {
    return <TextView text="event does not exist :C" />;
  }

  return (
    <View style={{ height: 0.6 * height, marginVertical: 64 }}>
      <EventItem item={event} navEnabled={false} />
    </View>
  );
};
