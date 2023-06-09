import { useLocalSearchParams } from "expo-router";
import { H2 } from "tamagui";

import { useEvent } from "../../src/domain/useEvents";

export default () => {
  const { id } = useLocalSearchParams();
  const { event } = useEvent(id as string);
  if (!event) {
    return <H2>event does not exist :C</H2>;
  }
  return <H2>{event?.title}</H2>;
};
