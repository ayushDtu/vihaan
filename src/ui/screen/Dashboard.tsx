import Icons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { H6, XStack } from "tamagui";

import { paths } from "../../domain/paths";
import { useEvents } from "../../domain/useEvents";

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
            style={{ flex: 1 }}
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
              {/* <View
                style={{
                  justifyContent: "center",
                  backgroundColor: "#2D3748",
                  alignSelf: "center",
                  borderRadius: 8,
                }}
              > */}
              <Image
                style={{
                  width: width * maxWidth,
                  height: 400,
                  overflow: "hidden",
                }}
                contentPosition="top center"
                source={item.image}
                contentFit="cover"
              />
              {/* </View> */}
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
      <XStack alignSelf="center" alignItems="center">
        <Icons.Button
          name="chevron-left"
          backgroundColor="transparent"
          onPress={() => {
            ref.current?.prev();
            setIndex(index - 1 >= 0 ? index - 1 : items.length - 1);
          }}
        />
        <H6>
          {index + 1} / {items.length / windowSize}
        </H6>
        {/* <View style={{ width: 20 }} /> */}
        <Icons.Button
          name="chevron-right"
          backgroundColor="transparent"
          onPress={() => {
            ref.current?.next();
            setIndex((index + 1) % items.length);
          }}
        />
      </XStack>
    </View>
    // <YStack f={1} jc="center" ai="center" backgroundColor="$backgroundSoft">
    //   <Paragraph color="$color" jc="center">
    //     blabla2
    //   </Paragraph>
    //   <Text>elo</Text>
    //   <StatusBar style="auto" />
    // </YStack>
  );
};

const maxWidth = 0.8;
