import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View } from "react-native";

import { api } from "../../data/api";
import { useAuthGuard } from "../../domain/useAuthGuard";
import { ButtonView } from "../components/ButtonView";
import { Input } from "../components/Input";
import { TextView } from "../components/TextView";
import { Variant, showToast } from "../components/Toast";
import { Colors } from "../styleguide/Styleguide";

export const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toISOString().split("T")[1].split(".")[0]
  );
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    // api.image.createPictureImagePost
  };

  useAuthGuard();

  return (
    <View style={{ maxWidth: 600, alignSelf: "center" }}>
      <TextView text="create event" />
      <View style={{ height: 24 }} />
      <TextView text="event name" />
      <Input
        placeholder="super event"
        color={Colors.primaryText}
        text={name}
        onChangeText={setName}
      />
      <View style={{ height: 16 }} />

      <TextView text="event date" />
      <Input color={Colors.primaryText} text={date} onChangeText={setDate} />
      <View style={{ height: 16 }} />

      <TextView text="event time" />
      <Input color={Colors.primaryText} text={time} onChangeText={setTime} />
      <View style={{ height: 16 }} />

      <ButtonView text="cover image" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      )}
      <View style={{ height: 24 }} />
      <ButtonView
        onPress={() => {
          const dateString = `${date}T${time}.000Z`;
          const jsDate = new Date(dateString);
          if (isNaN(jsDate.getTime())) {
            showToast(
              "Make sure date follows format YYYY-MM-DD and time HH:mm",
              Variant.error
            );
          } else {
            //  todo -> send event
          }
        }}
        text="create event"
      />
    </View>
  );
};
