import { useRef, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { useEvents } from "../../domain/useEvents";
import { EventItem } from "../components/EventItem";
import { TextView } from "../components/TextView";
import { ChevronLeft } from "../icons/ChevronLeft";
import { ChevronRight } from "../icons/ChevronRight";

export default () => {
  const { width, height } = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);
  const { events, loading } = useEvents();
  const [index, setIndex] = useState(0);
  const windowSize = 1;

  if (loading) return null;

  return (
    <View>
      <Carousel
        ref={ref}
        width={width}
        height={height / 1.3}
        windowSize={windowSize}
        data={events}
        scrollAnimationDuration={Platform.OS === "web" ? 500 : 300}
        mode="parallax"
        enabled={Platform.OS !== "web"}
        onSnapToItem={Platform.OS !== "web" ? setIndex : undefined}
        renderItem={({ item }) => <EventItem item={item} />}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {Platform.OS === "web" ? (
          <TouchableOpacity
            onPress={() => {
              setIndex(index - 1 >= 0 ? index - 1 : events.length - 1);
              ref.current?.prev();
            }}
            style={{ padding: 12 }}
          >
            <ChevronLeft />
          </TouchableOpacity>
        ) : null}
        <TextView text={`${index + 1} / ${events.length}`} />
        {Platform.OS === "web" ? (
          <TouchableOpacity
            onPress={() => {
              setIndex(index + 1 >= events.length ? 0 : index + 1);
              ref.current?.next();
            }}
            style={{ padding: 12 }}
          >
            <ChevronRight />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
