import { EventID } from "../data/types";

export const paths = {
  root: "/",
  createEvent: "/create-event",
  event: (id: EventID) => `/event/${id}`,
};
