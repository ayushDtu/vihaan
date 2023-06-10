import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export const ShowQr = () => {
  return (
    <View style={{ alignSelf: "center" }}>
      <View style={{ height: 20 }} />
      <QRCode size={256} value="http://awesome.link.qr" />
    </View>
  );
};
