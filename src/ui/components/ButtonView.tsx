import { ActivityIndicator, TouchableOpacity } from "react-native";

import { TextView, TextViewProps } from "./TextView";

export const ButtonView = ({
  onPress,
  loading,
  textViewProps,
  variant = ButtonVariant.primary,
}: {
  onPress: () => void;
  loading?: boolean;
  textViewProps: TextViewProps;
  variant?: ButtonVariant;
}) => {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={
        variant === ButtonVariant.secondary
          ? {
              backgroundColor: "rgba(0,0,0,0.15)",
              padding: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
            }
          : undefined
      }
    >
      <TextView {...textViewProps} />
    </TouchableOpacity>
  );
};

export enum ButtonVariant {
  primary,
  secondary,
}
