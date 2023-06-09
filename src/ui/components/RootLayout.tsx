import Icons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Adapt,
  Button,
  Dialog,
  Input,
  Label,
  Popover,
  PopoverProps,
  Sheet,
  TamaguiProvider,
  Theme,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";

import config from "../../../tamagui.config";
import { paths } from "../../domain/paths";
import {
  setTokenSelector,
  tokenSelector,
  useHydration,
  useStore,
} from "../../domain/store";

export const RootLayout = () => {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const storeHydrated = useHydration();

  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const token = useStore(tokenSelector);

  if (!loaded || !storeHydrated) {
    return null;
  }

  return (
    <RootSiblingParent>
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
              <Button onPress={() => router.push(paths.root)}>
                PolTicketeX
              </Button>
              <XStack>
                <DialogInstance />
                <View style={{ width: 12 }} />
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
                {token && (
                  <Button
                    onPress={() => {
                      router.push(paths.createEvent);
                      setOpen(false);
                    }}
                    style={{ minWidth: 200, marginBottom: 8 }}
                  >
                    {text.createEvent}
                  </Button>
                )}
              </Sheet.Frame>
            </Sheet>
          </Theme>
        </TamaguiProvider>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export function Demo({
  Icon,
  Name,
  ...props
}: PopoverProps & { Icon?: any; Name?: string }) {
  const router = useRouter();
  const token = useStore(tokenSelector);
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
              onPress={() => {
                router.push(paths.root);
              }}
              style={{ minWidth: 200, marginBottom: 8 }}
            >
              {text.upcomingEvents}
            </Button>
          </Popover.Close>
          {token ? (
            <Popover.Close asChild>
              <Button
                onPress={() => router.push(paths.createEvent)}
                style={{ minWidth: 200, marginBottom: 8 }}
              >
                {text.createEvent}
              </Button>
            </Popover.Close>
          ) : null}
        </YStack>
      </Popover.Content>
    </Popover>
  );
}

const text = {
  upcomingEvents: "upcoming events",
  createEvent: "create event",
  login: "login",
  logout: "logout",
};

function DialogInstance() {
  const [open, setOpen] = useState(false);
  const setToken = useStore(setTokenSelector);
  const token = useStore(tokenSelector);
  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button>{token ? "logout" : "auth"}</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          minWidth={300}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          <View style={{ height: 20 }} />
          {!token ? (
            <>
              <Label>username</Label>
              <Input />
              <Label>password</Label>
              <Input minWidth={100} secureTextEntry />
            </>
          ) : (
            <Label>are you sure?</Label>
          )}

          <XStack alignSelf="flex-end" space>
            {!token ? (
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  onPress={() => {
                    setToken("asdf");
                  }}
                  theme="alt1"
                  aria-label="Close"
                >
                  create account
                </Button>
              </Dialog.Close>
            ) : null}
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                onPress={() => {
                  token ? setToken(undefined) : setToken("asdf");
                }}
                theme="alt1"
                aria-label="Close"
              >
                {token ? "logout" : "login"}
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={<Icons name="close" />}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
