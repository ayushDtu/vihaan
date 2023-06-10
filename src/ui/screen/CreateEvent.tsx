import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { api } from "../../data/api";
import { Event } from "../../data/generated-api";
import { queryClient } from "../../data/queryClient";
import { queryKeys } from "../../data/queryKeys";
import { paths } from "../../domain/paths";
import { uploadFile } from "../../domain/uploadFile";
import { useAuthGuard } from "../../domain/useAuthGuard";
import { ButtonVariant, ButtonView } from "../components/ButtonView";
import { Input } from "../components/Input";
import { TextView } from "../components/TextView";
import { Variant, showToast } from "../components/Toast";
import { Colors } from "../styleguide/Styleguide";

export const CreateEvent = () => {
  const [name, setName] = useState("super event");
  const [description, setDescription] = useState("trust me");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toISOString().split("T")[1].split(".")[0]
  );
  const [quantity, setQuantity] = useState("10");
  const [price, setPrice] = useState("10");
  const [imageTmp, setImageTmp] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      setImage(imageTmp);
    },
    onError: () => {
      showToast("Error uploading image");
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (event: Event) => {
      const response = await api.event.createEventEventPost(event);
      await queryClient.invalidateQueries(queryKeys.events);
      return response;
    },
    onSuccess: (data, variables) => {
      router.push(paths.event(variables.contract_address));
      showToast("Event created", Variant.success);
    },
    onError: () => {
      showToast("Error creating event");
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImageMutation.mutate(result.assets[0]);
      setImageTmp(result.assets[0].uri);
    }
  };

  useAuthGuard();

  return (
    <ScrollView style={{ maxWidth: 600, alignSelf: "center" }}>
      <View style={{ height: 32 }} />
      <TextView fontSize={24} text="create event" />
      <View style={{ height: 24 }} />

      <View style={{ alignSelf: "center" }}>
        <ButtonView
          textViewProps={{
            text: "cover image",
          }}
          loading={uploadImageMutation.isLoading}
          onPress={pickImage}
        />
      </View>

      <View style={{ height: 16 }} />
      <TextView text="event name" />
      <Input color={Colors.primaryText} text={name} onChangeText={setName} />
      <View style={{ height: 16 }} />

      <TextView text="event description" />
      <Input
        color={Colors.primaryText}
        text={description}
        onChangeText={setDescription}
      />
      <View style={{ height: 16 }} />

      <TextView text="event date" />
      <Input color={Colors.primaryText} text={date} onChangeText={setDate} />
      <View style={{ height: 16 }} />

      <TextView text="event time" />
      <Input color={Colors.primaryText} text={time} onChangeText={setTime} />
      <View style={{ height: 16 }} />

      <TextView text="tickets quantity" />
      <Input
        color={Colors.primaryText}
        text={quantity}
        onChangeText={setQuantity}
      />
      <View style={{ height: 16 }} />

      <TextView text="ticket price" />
      <Input color={Colors.primaryText} text={price} onChangeText={setPrice} />
      <View style={{ height: 16 }} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      )}
      <View style={{ height: 32 }} />
      <View style={{ alignSelf: "center" }}>
        <ButtonView
          loading={createEventMutation.isLoading}
          onPress={() => {
            const dateString = `${date}T${time}.000Z`;
            const jsDate = new Date(dateString);
            if (isNaN(jsDate.getTime())) {
              showToast(
                "Make sure date follows format YYYY-MM-DD and time HH:mm",
                Variant.error
              );
              return;
            }
            if (!image || !uploadImageMutation.data) {
              showToast("Please upload an image");
              return;
            }
            if (!name) {
              showToast("Please enter a name");
              return;
            }
            const ticketsQuantity = parseInt(quantity, 10);
            const ticketPrice = parseFloat(price);

            if (
              !ticketsQuantity ||
              !ticketPrice ||
              ticketsQuantity <= 0 ||
              ticketPrice <= 0
            ) {
              showToast("Please enter valid price & quantity");
              return;
            }

            createEventMutation.mutate({
              description: "",
              event_image: uploadImageMutation.data as string,
              finish_day: jsDate.toISOString(),
              start_day: jsDate.toISOString(),
              name,
              preview_image: uploadImageMutation.data as string,
              contract_address: "0x0",
              ticket_price: ticketPrice,
              ticket_quantity: ticketsQuantity,
            });
          }}
          textViewProps={{
            text: "create event",
            color: Colors.tertiary,
          }}
          variant={ButtonVariant.secondary}
        />
      </View>
    </ScrollView>
  );
};
