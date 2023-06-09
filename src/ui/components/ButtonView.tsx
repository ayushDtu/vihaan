import { TouchableOpacity } from "react-native";

import { TextView } from "./TextView";
import { Colors } from "../styleguide/Styleguide";

export const ButtonView = ({
  text,
  color = Colors.primaryText,
  onPress,
}: {
  text: string;
  color?: Colors;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextView color={color} text={text} />
    </TouchableOpacity>
  );
};
