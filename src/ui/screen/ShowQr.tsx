import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { useEvent } from "../../domain/useEvents";

export const ShowQr = () => {
  const { id } = useLocalSearchParams();
  const { event } = useEvent(id as string);

  return (
    <View style={{ alignSelf: "center" }}>
      <View style={{ height: 20 }} />
      <QRCode size={256} value={event?.name} />
    </View>
  );
};
