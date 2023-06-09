import Icons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ButtonView } from "./ButtonView";
import { Input } from "./Input";
import { ModalView } from "./Modal";
import { TextView } from "./TextView";
import { setTokenSelector, useStore } from "../../domain/store";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useStore(setTokenSelector);

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
          <Icons
            backgroundColor="transparent"
            name="close"
            size={24}
            color={Colors.secondary}
          />
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
            color={Colors.secondary}
            text="login"
            onPress={() => {
              setToken("asdf");
              onClose();
            }}
          />
          <ButtonView
            color={Colors.secondary}
            text="create account"
            onPress={() => {
              setToken("asdf");
              onClose();
            }}
          />
        </View>
      </View>
    </View>
  );
};
