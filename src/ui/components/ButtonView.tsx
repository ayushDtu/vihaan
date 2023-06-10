import { ActivityIndicator, TouchableOpacity } from "react-native";

import { TextView } from "./TextView";
import { Colors } from "../styleguide/Styleguide";

export const ButtonView = ({
  text,
  color = Colors.primaryText,
  onPress,
  loading,
}: {
  text: string;
  color?: Colors;
  onPress: () => void;
  loading?: boolean;
}) => {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextView color={color} text={text} />
    </TouchableOpacity>
  );
};
