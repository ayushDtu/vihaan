import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Platform, Pressable, View, useWindowDimensions } from "react-native";

import { ButtonView } from "./ButtonView";
import { TextView } from "./TextView";
import { showToast } from "./Toast";
import { api } from "../../data/api";
import { Event } from "../../data/generated-api";
import { paths } from "../../domain/paths";
import { tokenSelector, useStore } from "../../domain/store";
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
  const token = useStore(tokenSelector);

  const buyTicketMutation = useMutation({
    mutationFn: () =>
      api.ticket.buyTicketTicketPost({
        eventContactAddress: item.contract_address,
        jwt_token: token!,
        privateKey: "",
        ticketQuantity: 1,
      }),
    onError: () => {
      showToast("Something went wrong, try again");
    },
    onSuccess: () => {
      showToast("Ticket bought");
    },
  });

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
      {!navEnabled ? (
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <ButtonView
            onPress={() => {
              // todo -> should be available if I have ticket
              router.push(paths.showQr(item.contract_address));
            }}
            textViewProps={{
              text: "show qr",
            }}
          />
          {Platform.OS !== "web" ? (
            <ButtonView
              onPress={() => {
                router.push(paths.scanQr(item.contract_address));
              }}
              textViewProps={{
                text: "scan qr",
              }}
            />
          ) : null}
        </View>
      ) : null}
      {token ? (
        <View style={{ alignSelf: "center" }}>
          <View style={{ height: 16 }} />
          <ButtonView
            loading={buyTicketMutation.isLoading}
            onPress={buyTicketMutation.mutate}
            textViewProps={{
              text: "buy ticket",
            }}
          />
        </View>
      ) : null}
    </Pressable>
  );
};
const maxWidth = 0.8;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
