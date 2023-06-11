import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { TextView, TextViewProps } from "./TextView";
import { Colors } from "../styleguide/Styleguide";

export const ButtonView = ({
  onPress,
  loading,
  textViewProps,
  variant = ButtonVariant.primary,
  style,
}: {
  onPress: () => void;
  loading?: boolean;
  textViewProps: TextViewProps;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
}) => {
  return loading ? (
    <ActivityIndicator />
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        variant === ButtonVariant.primary
          ? {
              backgroundColor: Colors.yellow,
              padding: 8,
              paddingHorizontal: 16,
              borderRadius: 6,
            }
          : {
              backgroundColor: Colors.darkGray,
              padding: 8,
              paddingHorizontal: 16,
              borderRadius: 6,
            },
      ]}
    >
      <TextView
        {...textViewProps}
        color={
          variant === ButtonVariant.secondary
            ? Colors.primaryText
            : Colors.darkGray
        }
      />
    </TouchableOpacity>
  );
};

export enum ButtonVariant {
  primary,
  secondary,
}
