import { TextInput } from "react-native";

import { Colors } from "../styleguide/Styleguide";

export const Input = ({
  text,
  onChangeText,
  color,
  borderColor,
  secureTextEntry,
  placeholder,
}: {
  text: string;
  onChangeText: (text: string) => void;
  color?: Colors;
  borderColor?: Colors;
  secureTextEntry?: boolean;
  placeholder?: string;
}) => {
  return (
    <TextInput
      style={{
        color,
        borderWidth: 1,
        borderColor: borderColor ?? color,
        borderRadius: 12,
        padding: 4,
        paddingHorizontal: 8,
        width: 300,
      }}
      secureTextEntry={secureTextEntry}
      value={text}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  );
};
