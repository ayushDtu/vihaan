import { Text } from "react-native";

import { Colors } from "../styleguide/Styleguide";

export const TextView = ({
  text,
  color = Colors.primaryText,
}: {
  text: string;
  color?: Colors;
}) => {
  return <Text style={{ color }}>{text}</Text>;
};
