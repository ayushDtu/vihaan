import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, View, useWindowDimensions } from "react-native";

import { TextView } from "./TextView";
import { Event } from "../../data/generated-api";
import { paths } from "../../domain/paths";
import { Colors } from "../styleguide/Styleguide";

export const EventItem = ({
  item,
  navEnabled = true,
}: {
  item: Event;
  navEnabled?: boolean;
}) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <Pressable
      style={{ flex: 1, width }}
      onPress={() => {
        if (navEnabled) {
          router.push(paths.event(item.contract_address));
        }
      }}
    >
      <View
        style={{
          justifyContent: "center",
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
          source={item.event_image}
          contentFit="cover"
          placeholder={blurhash}
        />

        <TextView
          text={item.name}
          textAlign="center"
          fontSize={30}
          backgroundColor={Colors.tertiary}
          color={Colors.primary}
          maxWidth={width * maxWidth}
        />
        <TextView
          text={new Date(item.start_day).toLocaleDateString()}
          textAlign="center"
          fontSize={24}
          backgroundColor={Colors.tertiary}
          color={Colors.primary}
          maxWidth={width * maxWidth}
        />
      </View>
    </Pressable>
  );
};
const maxWidth = 0.8;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
