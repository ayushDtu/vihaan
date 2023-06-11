import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import { queryKeys } from "../../data/queryKeys";
import { useEvent } from "../../domain/useEvents";
import { ButtonView } from "../components/ButtonView";
import { TextView } from "../components/TextView";
import { showToast } from "../components/Toast";

export const MarketPlace = () => {
  const { id } = useLocalSearchParams();
  const { event } = useEvent(id as string);

  const marketPlaceQuery = useQuery({
    queryKey: queryKeys.marketPlace,
    queryFn: () => {
      return Promise.resolve([
        {
          id: 1,
          price: 10,
        },
        {
          id: 2,
          price: 20,
        },
        {
          id: 3,
          price: 30,
        },
        {
          id: 4,
          price: 40,
        },
      ]);
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
        fontSize={32}
        textAlign="center"
        text={`Market place for event: "${event?.name ?? "Super Event"}"`}
      />
      <View style={{ height: 30 }} />
      {marketPlaceQuery.data?.map((item) => {
        return (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <TextView text={`price ${item.price?.toString()}`} />
            <View style={{ width: 30 }} />
            <ButtonView
              textViewProps={{
                text: "buy",
              }}
              onPress={() => buyTicketMutation.mutate(item.id)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
