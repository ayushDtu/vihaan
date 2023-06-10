import { ImagePickerAsset } from "expo-image-picker";
import { Platform } from "react-native";

import { baseURL } from "../data/api";

export const uploadFile = async (asset: ImagePickerAsset) => {
  const data = new FormData();

  if (Platform.OS === "web") {
    const fileType = asset.uri.split(";")[0].split(":")[1];
    const response = await fetch(asset.uri);
    const blob = await response.blob();
    data.append("second_art", blob, `photo.${fileType}`);
  } else {
    const uriParts = asset.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    // @ts-ignore
    data.append("second_art", {
      // @ts-ignore
      uri: asset.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }
  return fetch(`${baseURL}/image`, {
    method: "POST",
    body: data,
  }).then((r) => r.json());
};
