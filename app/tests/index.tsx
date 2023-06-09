import { Image } from "expo-image";
import { View, Text } from "react-native";

export default () => {
  return (
    <>
      {/* <View style={{ flex: 1 }}> */}
      <Text style={{ color: "white" }}>asdf</Text>
      {/* <View style={{ overflow: "hidden" }}> */}
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "#2D3748",
          alignSelf: "center",
          borderRadius: 8,
        }}
      >
        <Image
          style={{
            // flex: 1,
            width: 200,
            height: 400,
            borderWidth: 1,
            borderColor: "red",
            // width: "100%",
            //   height: 400,
            //   width: 200,
            //   maxHeight: 400,
            //   overflow: "hidden",
            //   backgroundColor: "#0553",
            // alignSelf: "center",
            overflow: "hidden",
          }}
          contentPosition="top center"
          //   source="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1322277517%2Fphoto%2Fwild-grass-in-the-mountains-at-sunset.jpg"
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
        />
        {/* </View> */}
        <Text style={{ color: "white" }}>asdfdfalkjsdfklasdjflks</Text>
      </View>
      {/* </View> */}
    </>
  );
};
