import Icons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AuthModal } from "./AuthModal";
import { ButtonView } from "./ButtonView";
import { NavigationModal } from "./NavigationModal";
import { paths } from "../../domain/paths";
import {
  setTokenSelector,
  tokenSelector,
  useHydration,
  useStore,
} from "../../domain/store";
import { Colors } from "../styleguide/Styleguide";

export const RootLayout = () => {
  const storeHydrated = useHydration();

  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const token = useStore(tokenSelector);
  const setToken = useStore(setTokenSelector);
  const { height, width } = useWindowDimensions();

  const [navigationModalOpen, setNavigationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (/*!loaded ||*/ !storeHydrated) {
    return null;
  }

  return (
    <RootSiblingParent>
      <View
        style={{
          backgroundColor: Colors.primary,
          flex: 1,
        }}
      >
        <SafeAreaProvider>
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 12,
                paddingTop: Platform.OS === "android" ? 24 : 12,
                paddingBottom: Platform.OS === "android" ? 6 : 12,
              }}
            >
              <ButtonView
                onPress={() => router.push(paths.root)}
                text="PolTicketeX"
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ButtonView
                  onPress={() => {
                    if (token) {
                      setToken(undefined);
                    } else {
                      setAuthModalOpen(true);
                    }
                  }}
                  text={token ? "logout" : "login"}
                />
                <View style={{ width: 12 }} />
                <TouchableOpacity
                  onPress={() => {
                    setNavigationModalOpen(true);
                  }}
                >
                  <Icons
                    size={24}
                    color={Colors.primaryText}
                    backgroundColor="transparent"
                    name="menu"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height, backgroundColor: Colors.secondary }}>
              <Slot />
            </View>
          </SafeAreaView>
          <NavigationModal
            modalVisible={navigationModalOpen}
            setModalVisible={setNavigationModalOpen}
          />
          <AuthModal
            modalVisible={authModalOpen}
            setModalVisible={setAuthModalOpen}
          />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </View>
    </RootSiblingParent>
  );
};

const text = {
  upcomingEvents: "upcoming events",
  createEvent: "create event",
  login: "login",
  logout: "logout",
};
