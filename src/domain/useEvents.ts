import { useQuery } from "@tanstack/react-query";

import { api } from "../data/api";
import { queryKeys } from "../data/queryKeys";
import { EventID } from "../data/types";

export const useEvents = () => {
  const query = useQuery({
    queryKey: queryKeys.events,
    queryFn: api.event.getEventEventGet,
  });
  return { events: query.data ?? [], loading: query.isLoading };
};

export const useEvent = (id: EventID) => {
  const { events } = useEvents();
  return { event: events.find((item) => item.contract_address === id) };
};
