import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { YStack, Paragraph } from "tamagui";

export default () => {
  return (
    <YStack f={1} jc="center" ai="center" backgroundColor="$backgroundSoft">
      <Paragraph color="$color" jc="center">
        blabla2
      </Paragraph>
      <Text>elo</Text>
      <StatusBar style="auto" />
    </YStack>
  );
};
