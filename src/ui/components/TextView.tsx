import { Text } from "react-native";

import { Colors } from "../styleguide/Styleguide";

export type TextViewProps = { text: string; color?: Colors; fontSize?: number };

export const TextView = ({
  text,
  color = Colors.primaryText,
  fontSize = 16,
}: TextViewProps) => {
  return (
    <Text style={{ color, fontFamily: "Inter_800ExtraBold", fontSize }}>
      {text}
    </Text>
  );
};
