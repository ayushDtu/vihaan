import Toast, { ToastOptions } from "react-native-root-toast";

import { Colors } from "../styleguide/Styleguide";

export const showToast = (
  message: string,
  variant: Variant = Variant.error,
  options?: ToastOptions
) => {
  Toast.show(message, {
    position: 50,
    duration: Toast.durations.LONG,
    backgroundColor: variant === Variant.error ? Colors.red : Colors.primary,
    ...options,
  });
};

export enum Variant {
  error,
  success,
}
