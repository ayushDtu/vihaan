import { useQuery } from "@tanstack/react-query";

import { api } from "../data/api";
import { queryKeys } from "../data/queryKeys";
import { EventID } from "../data/types";

export const useEvents = () => {
  const query = useQuery({
    queryKey: queryKeys.events,
    queryFn: api.event.getEventEventGet,
  });

  return {
    events:
      query.data?.filter(
        (e) =>
          e.contract_address.length ===
            "0xBa41daf1680b3afb20E9F474F57F31b9cbc6990a".length &&
          e.event_image.startsWith("https://") &&
          !isNaN(new Date(e.start_day).getTime())
      ) ?? [],
    loading: query.isLoading,
  };
};

export const useEvent = (id: EventID) => {
  const { events } = useEvents();
  return { event: events.find((item) => item.contract_address === id) };
};
