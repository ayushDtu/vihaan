import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform, View } from "react-native";
import { Button, H1, H5, Input, Label } from "tamagui";

import { Variant, showToast } from "../components/Toast";

export const CreateEvent = () => {
  //   const [date, setDate] = useState(new Date());
  const [name, setName] = useState("super event");
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
  };

  return (
    <View style={{ maxWidth: 600, alignSelf: "center" }}>
      <H1>Create event</H1>
      <Label>Event name </Label>
      <Input placeholderTextColor="white" value={name} onChangeText={setName} />

      <Label>Event date</Label>
      <Input placeholderTextColor="white" value={date} onChangeText={setDate} />

      <Label>Event time</Label>
      <Input placeholderTextColor="white" value={time} onChangeText={setTime} />

      <View style={{ height: 20 }} />
      <Button onPress={pickImage}>Cover image</Button>

      <View style={{ height: 10 }} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      )}
      <View style={{ height: 60 }} />
      <Button
        onPress={() => {
          try {
            const dateString = `${date}T${time}.000Z`;
            const jsDate = new Date(dateString);
          } catch (e) {
            showToast(
              "Make sure date follows format YYYY-MM-DD and time HH:mm",
              Variant.error
            );
          }
        }}
        maxWidth={200}
        alignSelf="center"
      >
        create event
      </Button>
    </View>
  );
};

const NativeDateTimePicker = () => {
  //   const [date, setDate] = useState(new Date(1598051730000));

  //   const onChange = (event, selectedDate) => {
  //     const currentDate = selectedDate;
  //     setDate(currentDate);
  //   };

  //   const showMode = (currentMode) => {
  //     DateTimePickerAndroid.open({
  //       value: date,
  //       onChange,
  //       mode: currentMode,
  //       is24Hour: true,
  //     });
  //   };

  //   const showDatepicker = () => {
  //     showMode("date");
  //   };

  //   const showTimepicker = () => {
  //     showMode("time");
  //   };
  const sourceDate = new Date();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(MODE_VALUES![0]);
  const [date, setDate] = useState(sourceDate);
  const [display, setDisplay] = useState(DISPLAY_VALUES![0]);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    // if (event.type === "dismissed") {
    //   Alert.alert(
    //     "picker was dismissed",
    //     undefined,
    //     [
    //       {
    //         text: "great",
    //       },
    //     ],
    //     { cancelable: true }
    //   );
    //   return;
    // }

    if (event.type === "neutralButtonPressed") {
      setDate(new Date(0));
    } else {
      setDate(selectedDate);
    }
  };
  return (
    <View testID="appRootView" style={{}}>
      <View style={{ flexDirection: "row" }}>
        <H5>
          {/*TZ: {RNLocalize.getTimeZone()}, original:{' '}*/}
          {sourceDate.toLocaleDateString()}
        </H5>
      </View>
      {/* <ThemedText>mode prop:</ThemedText> */}
      {/* <SegmentedControl
        values={MODE_VALUES}
        selectedIndex={MODE_VALUES.indexOf(mode)}
        onChange={(event) => {
          setMode(MODE_VALUES[event.nativeEvent.selectedSegmentIndex]);
        }}
      />
      <ThemedText>display prop:</ThemedText>
      <SegmentedControl
        values={DISPLAY_VALUES}
        selectedIndex={DISPLAY_VALUES.indexOf(display)}
        onChange={(event) => {
          setDisplay(DISPLAY_VALUES[event.nativeEvent.selectedSegmentIndex]);
        }}
      />
      <ThemedText>minute interval prop:</ThemedText>
      <SegmentedControl
        values={MINUTE_INTERVALS.map(String)}
        selectedIndex={MINUTE_INTERVALS.indexOf(interval)}
        onChange={(event) => {
          setMinInterval(
            MINUTE_INTERVALS[event.nativeEvent.selectedSegmentIndex]
          );
        }}
      />
      <View style={styles.header}>
        <ThemedText style={styles.textLabel}>text color (iOS only)</ThemedText>
        <ThemedTextInput
          value={textColor}
          onChangeText={(text) => {
            setTextColor(text.toLowerCase());
          }}
          placeholder="textColor"
        />
      </View>
      <View style={styles.header}>
        <ThemedText style={styles.textLabel}>
          accent color (iOS only)
        </ThemedText>
        <ThemedTextInput
          value={accentColor}
          onChangeText={(text) => {
            setAccentColor(text.toLowerCase());
          }}
          placeholder="accentColor"
        />
      </View>
      <View style={styles.header}>
        <ThemedText style={styles.textLabel}>disabled (iOS only)</ThemedText>
        <Switch value={disabled} onValueChange={setDisabled} />
      </View>
      <View style={styles.header}>
        <ThemedText style={styles.textLabel}>
          neutralButtonLabel (android only)
        </ThemedText>
        <ThemedTextInput
          value={neutralButtonLabel}
          onChangeText={setNeutralButtonLabel}
          placeholder="neutralButtonLabel"
          testID="neutralButtonLabelTextInput"
        />
      </View>
      <View style={styles.header}>
        <ThemedText style={styles.textLabel}>
          [android] show and dismiss picker after 3 secs
        </ThemedText>
      </View> */}
      <View>
        <Button
          testID="showAndDismissPickerButton"
          onPress={() => {
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 6000);
          }}
        >
          Show and dismiss picker!
        </Button>
      </View>
      <View
        style={[
          //   styles.button,
          { flexDirection: "row", justifyContent: "space-around" },
        ]}
      >
        <Button
          testID="showPickerButton"
          onPress={() => {
            setShow(true);
          }}
        >
          Show picker!
        </Button>
        <Button testID="hidePicker" onPress={() => setShow(false)}>
          Hide picker!
        </Button>
      </View>
      {show && (
        <DateTimePicker
          //   testID="dateTimePicker"
          //   timeZoneOffsetInMinutes={tzOffsetInMinutes}
          //   minuteInterval={interval}
          //   maximumDate={maximumDate}
          //   minimumDate={minimumDate}
          value={date}
          //   @ts-ignore
          mode={mode}
          is24Hour
          //   @ts-ignore
          display={display}
          onChange={onChange}
          //   textColor={textColor || undefined}
          //   accentColor={accentColor || undefined}
          neutralButton={{ label: "neutralButtonLabel " }}
          negativeButton={{ label: "Cancel", textColor: "red" }}
          //   disabled={disabled}
        />
      )}
    </View>
  );
};
const COMMON_MODES = {
  date: "date",
  time: "time",
};
export const IOS_MODE = {
  ...COMMON_MODES,
  datetime: "datetime",
  countdown: "countdown",
};

export const ANDROID_MODE = COMMON_MODES;

const MODE_VALUES = Platform.select({
  ios: Object.values(IOS_MODE),
  android: Object.values(ANDROID_MODE),
  windows: [],
});
export const IOS_DISPLAY = {
  //   default: "default",
  //   spinner: "spinner",
  //   compact: "compact",
  inline: "inline",
};
export const ANDROID_DISPLAY = {
  default: "default",
  spinner: "spinner",

  // NOTE: the following are exposed, but the native module instead uses "default"
  clock: "clock",
  calendar: "calendar",
};
const DISPLAY_VALUES = Platform.select({
  ios: Object.values(IOS_DISPLAY),
  android: Object.values(ANDROID_DISPLAY),
  windows: [],
});
