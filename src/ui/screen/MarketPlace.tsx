import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

import { api } from "../../data/api";
import { queryKeys } from "../../data/queryKeys";
import { useStore } from "../../domain/store";
import { useEvent } from "../../domain/useEvents";
import { ButtonVariant, ButtonView } from "../components/ButtonView";
import { TextView } from "../components/TextView";
import { showToast } from "../components/Toast";
import { Colors } from "../styleguide/Styleguide";

export const MarketPlace = () => {
  const { id } = useLocalSearchParams();
  const { event } = useEvent(id as string);

  const marketPlaceQuery = useQuery({
    queryKey: queryKeys.marketPlace(event?.contract_address!),
    enabled: !!event,
    queryFn: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks

      const res = api.listTickets.getListTicketsListTicketsGet({
        jwt_token: useStore.getState().token!,
        eventContractAddress: event?.contract_address!,
      });

      return res;

      // return Promise.resolve([
      //   {
      //     tokenId: 0,
      //     price: 0,
      //     selller: "0x0000000000000000000000000000000000000000",
      //     isListed: false,
      //   },
      // ]);
    },
  });

  const buyTicketMutation = useMutation({
    mutationFn: async (id: number) => {
      const f = await Promise.resolve();
      await marketPlaceQuery.refetch();

      return f;
    },
    onSuccess: () => {
      showToast("Ticket bought");
    },
    onError: () => {
      showToast("Something went wrong, try again");
    },
  });

  return (
    <ScrollView style={{ alignSelf: "center", paddingTop: 24 }}>
      <TextView
        fontSize={28}
        textAlign="center"
        text={`Market place for event \n ${event?.name ?? "Super Event"}`}
      />
      <View style={{ height: 30 }} />

      {marketPlaceQuery.isLoading ? <ActivityIndicator /> : null}

      {marketPlaceQuery.data?.map((item) => {
        return (
          <View
            key={item.tokenId}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              gap: 32,
              marginHorizontal: 16,
            }}
          >
            <TextView
              textAlign="center"
              text={`Ticket \n${item.tokenId?.toString()}`}
            />
            <TextView
              textAlign="center"
              text={`Is available \n${item.isListed?.toString()}`}
            />
            <ButtonView
              textViewProps={{
                text: "Buy Ticket",
              }}
              onPress={() => buyTicketMutation.mutate(item.tokenId)}
              variant={ButtonVariant.secondary}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
