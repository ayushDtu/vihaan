import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { View } from "react-native";
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
        minWidth: 200,
        minHeight: 200,
        paddingLeft: 16,
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

      <View style={{ paddingRight: 16 }}>
        <TextView color={Colors.secondary} text="username" />
        <Input
          color={Colors.secondary}
          text={username}
          onChangeText={setUsername}
        />
        <View style={{ height: 16 }} />
        <TextView color={Colors.secondary} text="password" />
        <Input
          color={Colors.secondary}
          secureTextEntry
          text={password}
          onChangeText={setPassword}
        />
        <View style={{ height: 16 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonView
            textViewProps={{
              color: Colors.secondary,
              text: "login",
            }}
            loading={loginMutation.isLoading}
            onPress={() => {
              loginMutation.mutate({ username, password });
            }}
            variant={ButtonVariant.secondary}
          />
          <ButtonView
            textViewProps={{
              color: Colors.secondary,
              text: "create account",
            }}
            loading={signupMutation.isLoading}
            onPress={() => {
              signupMutation.mutate({ username, password });
            }}
            variant={ButtonVariant.secondary}
          />
        </View>
        <View style={{ height: 16 }} />
      </View>
    </View>
  );
};
