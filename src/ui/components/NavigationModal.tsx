import Icons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ButtonView } from "./ButtonView";
import { ModalView } from "./Modal";
import { paths } from "../../domain/paths";
import { tokenSelector, useStore } from "../../domain/store";
import { Colors } from "../styleguide/Styleguide";

export const NavigationModal = ({
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
  const router = useRouter();
  const token = useStore(tokenSelector);
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

      <ButtonView
        color={Colors.secondary}
        text="upcoming events"
        onPress={() => {
          router.push(paths.root);
          onClose();
        }}
      />
      {token ? (
        <>
          <View style={{ height: 12 }} />
          <ButtonView
            color={Colors.secondary}
            text="create event"
            onPress={() => {
              router.push(paths.createEvent);
              onClose();
            }}
          />
        </>
      ) : null}
    </View>
  );
};
