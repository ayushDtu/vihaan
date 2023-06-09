import Icons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Adapt,
  Button,
  Popover,
  PopoverProps,
  Sheet,
  TamaguiProvider,
  Theme,
  XStack,
  YStack,
} from "tamagui";

import { paths } from "../src/domain/paths";
import config from "../tamagui.config";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Theme name="dark">
          <XStack
            backgroundColor="#171923"
            paddingBottom={
              Platform.OS === "web" ? 8 : Platform.OS === "ios" ? 12 : 6
            }
            paddingTop={Platform.OS === "web" ? 6 : insets.top}
            paddingLeft={12}
            paddingRight={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Button onPress={() => router.push(paths.root)}>PolTicketeX</Button>
            {Platform.OS === "web" ? (
              <Demo
                placement="bottom"
                Icon={<Icons name="menu" />}
                Name="bottom-popover"
              />
            ) : (
              <Icons.Button
                backgroundColor="transparent"
                name="menu"
                onPress={() => {
                  setOpen(true);
                }}
              />
            )}
          </XStack>
          <View style={{ flex: 1, backgroundColor: "#000" }}>
            <Slot />
          </View>

          <Sheet
            open={open}
            onOpenChange={setOpen}
            snapPoints={[85, 50, 25]}
            dismissOnSnapToBottom
            zIndex={100_000}
            animation="bouncy"
          >
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame
              flex={1}
              padding="$4"
              justifyContent="center"
              alignItems="center"
              space="$5"
            >
              <Button
                size="$6"
                circular
                icon={<Icons name="arrow-downward" />}
                onPress={() => setOpen(false)}
              />
              <Button
                onPress={() => {
                  router.push(paths.root);
                  setOpen(false);
                }}
                style={{ minWidth: 200, marginBottom: 8 }}
              >
                {text.upcomingEvents}
              </Button>
              <Button
                onPress={() => {
                  router.push(paths.createEvent);
                  setOpen(false);
                }}
                style={{ minWidth: 200, marginBottom: 8 }}
              >
                {text.createEvent}
              </Button>
            </Sheet.Frame>
          </Sheet>
        </Theme>
      </TamaguiProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

export function Demo({
  Icon,
  Name,
  ...props
}: PopoverProps & { Icon?: any; Name?: string }) {
  const router = useRouter();
  return (
    <Popover size="$5" allowFlip {...props}>
      <Popover.Trigger asChild>
        <Button icon={Icon} />
      </Popover.Trigger>

      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ x: 0, y: -10, opacity: 0 }}
        exitStyle={{ x: 0, y: -10, opacity: 0 }}
        x={0}
        y={0}
        opacity={1}
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        elevate
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <YStack space="$3">
          <Popover.Close asChild>
            <Button
              onPress={() => router.push(paths.root)}
              size="$3"
              style={{ minWidth: 200, marginBottom: 8 }}
            >
              {text.upcomingEvents}
            </Button>
          </Popover.Close>
          <Popover.Close asChild>
            <Button
              onPress={() => router.push(paths.createEvent)}
              style={{ minWidth: 200, marginBottom: 8 }}
            >
              {text.createEvent}
            </Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  );
}

const text = {
  upcomingEvents: "upcoming events",
  createEvent: "create event",
};
