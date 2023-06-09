import Icons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { YStack, Paragraph, Button, XStack, H6 } from "tamagui";

export default () => {
  const { width } = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);
  const items = [...new Array(6).keys()];
  const [index, setIndex] = useState(0);
  const windowSize = 1;
  return (
    <View>
      <Carousel
        ref={ref}
        //   loop
        width={width}
        height={width / 2}
        //   autoPlay
        windowSize={windowSize}
        data={items}
        scrollAnimationDuration={1000}
        onSnapToItem={setIndex}
        renderItem={({ index }) => (
          <View
            style={{
              //   flex: 1,
              //   borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30, color: "#fff" }}>
              {index + 1}
            </Text>
          </View>
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
