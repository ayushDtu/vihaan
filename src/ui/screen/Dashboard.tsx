import Icons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { paths } from "../../domain/paths";
import { useEvents } from "../../domain/useEvents";
import { TextView } from "../components/TextView";
import { Colors } from "../styleguide/Styleguide";

export default () => {
  const { width, height } = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);
  const { events: items } = useEvents();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const windowSize = 1;
  return (
    <View>
      <Carousel
        ref={ref}
        width={width}
        height={height / 2}
        windowSize={windowSize}
        data={items}
        scrollAnimationDuration={1000}
        mode="parallax"
        enabled={Platform.OS !== "web"}
        onSnapToItem={setIndex}
        renderItem={({ index, item }) => (
          <Pressable
            style={{ flex: 1, width }}
            onPress={() => {
              router.push(paths.event(item.id));
            }}
          >
            <View
              style={{
                justifyContent: "center",
                backgroundColor: "#2D3748",
                alignSelf: "center",
                borderRadius: 8,
                flex: 1,
              }}
            >
              <Image
                style={{
                  width: width * maxWidth,
                  height: 270,
                  overflow: "hidden",
                }}
                contentPosition="top center"
                source={item.image}
                contentFit="cover"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 30,
                  maxWidth: width * maxWidth,
                  color: "#fff",
                  backgroundColor: "#000",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  maxWidth: width * maxWidth,
                  color: "#999",
                  backgroundColor: "#000",
                }}
              >
                {item.date}
              </Text>
            </View>
          </Pressable>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            ref.current?.prev();
            setIndex(index - 1 >= 0 ? index - 1 : items.length - 1);
          }}
          style={{ padding: 12 }}
        >
          <Icons
            backgroundColor="transparent"
            name="chevron-left"
            size={24}
            color={Colors.primaryText}
          />
        </TouchableOpacity>
        <TextView text={`${index + 1} / ${items.length}`} />
        <TouchableOpacity
          onPress={() => {
            ref.current?.next();
            setIndex(index - 1 >= 0 ? index - 1 : items.length - 1);
          }}
          style={{ padding: 12 }}
        >
          <Icons
            backgroundColor="transparent"
            name="chevron-right"
            size={24}
            color={Colors.primaryText}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const maxWidth = 0.8;
