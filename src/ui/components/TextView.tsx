import { ColorValue, Text } from "react-native";

import { Colors } from "../styleguide/Styleguide";

export type TextViewProps = {
  text: string;
  color?: Colors;
  fontSize?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  maxWidth?: number;
  backgroundColor?: ColorValue | undefined;
  padding?: number;
};

export const TextView = ({
  text,
  color = Colors.primaryText,
  fontSize = 16,
  textAlign,
  maxWidth,
  backgroundColor,
  padding,
}: TextViewProps) => {
  return (
    <Text
      style={{
        color,
        fontFamily: "Inter_800ExtraBold",
        fontSize,
        textAlign,
        maxWidth,
        backgroundColor,
        padding,
      }}
    >
      {text}
    </Text>
  );
};
