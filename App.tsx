import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Paragraph, TamaguiProvider, Theme, YStack } from "tamagui";

import config from "./tamagui.config";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <YStack f={1} jc="center" ai="center" backgroundColor="$backgroundSoft">
          <Paragraph color="$color" jc="center">
            blabla
          </Paragraph>
          <StatusBar style="auto" />
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}
