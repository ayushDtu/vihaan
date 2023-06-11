import { useRouter } from "expo-router";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ButtonVariant, ButtonView } from "./ButtonView";
import { ModalView } from "./Modal";
import { paths } from "../../domain/paths";
import { tokenSelector, useStore } from "../../domain/store";
import { CloseIcon } from "../icons/Closeicon";
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
        paddingHorizontal: 32,
        paddingBottom: 32,
        backgroundColor: Colors.darkGray,
        borderRadius: 6,
        maxWidth: 600,
        minWidth: 300,
      }}
    >
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{ padding: 12, paddingRight: 0 }}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <View style={{ gap: 16 }}>
        <ButtonView
          textViewProps={{
            color: Colors.secondary,
            text: "Upcoming Events",
            fontSize: 20,
          }}
          onPress={() => {
            router.push(paths.root);
            onClose();
          }}
          variant={ButtonVariant.secondary}
          style={{
            alignItems: "center",
          }}
        />
        {token ? (
          <>
            <ButtonView
              textViewProps={{
                color: Colors.secondary,
                text: "Create Event",
                fontSize: 20,
              }}
              onPress={() => {
                router.push(paths.createEvent);
                onClose();
              }}
              variant={ButtonVariant.secondary}
              style={{
                alignItems: "center",
              }}
            />
            <ButtonView
              textViewProps={{
                color: Colors.secondary,
                text: "My Events",
                fontSize: 20,
              }}
              onPress={() => {
                router.push(paths.myEvents);
                onClose();
              }}
              variant={ButtonVariant.secondary}
              style={{
                alignItems: "center",
              }}
            />
          </>
        ) : null}
      </View>
    </View>
  );
};
