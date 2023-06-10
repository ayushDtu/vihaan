import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, View, useWindowDimensions, Text } from "react-native";

import { Event } from "../../data/generated-api";
import { paths } from "../../domain/paths";

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
          source={item.event_image}
          contentFit="cover"
          placeholder={blurhash}
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
          {item.name}
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
          {item.start_day}
        </Text>
      </View>
    </Pressable>
  );
};
const maxWidth = 0.8;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
