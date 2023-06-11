import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Platform, View, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ButtonVariant, ButtonView } from "./ButtonView";
import { Input } from "./Input";
import { ModalView } from "./Modal";
import { TextView } from "./TextView";
import { showToast } from "./Toast";
import { api } from "../../data/api";
import { setTokenSelector, useStore } from "../../domain/store";
import { CloseIcon } from "../icons/Closeicon";
import { Colors } from "../styleguide/Styleguide";

export const AuthModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const onClose = () => setModalVisible(false);
  return (
    <ModalView
      content={<Content onClose={onClose} />}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

const Content = ({ onClose }: { onClose: () => void }) => {
  // todo remove
  const [username, setUsername] = useState("mateusz1@gmail.com");
  const [password, setPassword] = useState("admin1234");
  const setToken = useStore(setTokenSelector);
  const { width } = useWindowDimensions();

  const loginMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return api.login.logToAccountLoginPost({
        user_email: username,
        user_password: password,
      });
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      onClose();
    },
    onError: () => {
      showToast("Invalid credentials");
    },
  });

  const signupMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      // todo model?
      return api.account.creteAccountAccountPost({
        user_email: username,
        user_password: password,
        user_name: "tmp",
        wallet_address: "",
        wallet_private_key: "",
      });
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      onClose();
    },
    onError: () => {
      showToast("Invalid credentials");
    },
  });

  return (
    <View
      style={{
        paddingHorizontal: 32,
        paddingTop: 16,
        paddingBottom: 32,
        backgroundColor: Colors.darkGray,
        borderRadius: 6,
        maxWidth: 600,
        minWidth: Platform.OS === "ios" ? 300 : width * 0.3,
      }}
    >
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <TouchableOpacity onPress={onClose} style={{ padding: 12 }}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "column", gap: 16 }}>
        <View style={{ gap: 4 }}>
          <TextView color={Colors.grayWhite} fontSize={12} text="E-mail" />
          <Input
            color={Colors.lightGray}
            text={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={{ gap: 4 }}>
          <TextView color={Colors.grayWhite} fontSize={12} text="Password" />
          <Input
            color={Colors.lightGray}
            secureTextEntry
            text={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={{ height: 16 }} />
        <View
          style={{ flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <ButtonView
            variant={ButtonVariant.primary}
            textViewProps={{
              color: Colors.primary,
              text: "Login",
            }}
            loading={loginMutation.isLoading}
            onPress={() => {
              loginMutation.mutate({ username, password });
            }}
            style={{
              minWidth: 200,
              alignItems: "center",
            }}
          />
          <ButtonView
            textViewProps={{
              color: Colors.secondary,
              text: "Create Account",
            }}
            loading={signupMutation.isLoading}
            onPress={() => {
              signupMutation.mutate({ username, password });
            }}
            style={{
              minWidth: 200,
              alignItems: "center",
            }}
            variant={ButtonVariant.secondary}
          />
        </View>
        <View style={{ height: 16 }} />
      </View>
    </View>
  );
};
