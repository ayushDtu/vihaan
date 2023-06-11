import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView, View } from "react-native";

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
    <ScrollView
      style={{
        minWidth: Platform.OS === "ios" ? 300 : 600,
        alignSelf: "center",
      }}
    >
      <View style={{ height: 32 }} />
      <TextView fontSize={24} text="Create Event" />
      <View style={{ height: 32 }} />

      <View style={{ gap: 24 }}>
        <ButtonView
          textViewProps={{
            text: "Upload Cover Image",
            textAlign: "center",
            padding: 4,
          }}
          loading={uploadImageMutation.isLoading}
          onPress={pickImage}
          variant={ButtonVariant.secondary}
        />

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
        )}

        <View style={{ gap: 4 }}>
          <TextView color={Colors.grayWhite} fontSize={12} text="Event Name" />
          <Input color={Colors.lightGray} text={name} onChangeText={setName} />
        </View>

        <View style={{ gap: 4 }}>
          <TextView
            color={Colors.grayWhite}
            fontSize={12}
            text="Event Description"
          />
          <Input
            color={Colors.lightGray}
            text={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={{ gap: 4 }}>
          <TextView color={Colors.grayWhite} fontSize={12} text="Event Date" />
          <Input color={Colors.lightGray} text={date} onChangeText={setDate} />
        </View>

        <View style={{ gap: 4 }}>
          <TextView color={Colors.grayWhite} fontSize={12} text="Event Time" />
          <Input color={Colors.lightGray} text={time} onChangeText={setTime} />
        </View>

        <View style={{ flexDirection: "row", gap: 8, width: 300 }}>
          <View style={{ gap: 4 }}>
            <TextView
              color={Colors.grayWhite}
              fontSize={12}
              text="Tickets Quantity"
            />
            <Input
              color={Colors.lightGray}
              text={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <View style={{ gap: 4 }}>
            <TextView
              color={Colors.grayWhite}
              fontSize={12}
              text="Ticket Price"
            />
            <Input
              color={Colors.lightGray}
              text={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

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

            // todo model?
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
            text: "Create Event",
            color: Colors.tertiary,
            textAlign: "center",
            padding: 8,
          }}
          variant={ButtonVariant.primary}
        />
      </View>
    </ScrollView>
  );
};
