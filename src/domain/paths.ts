import { EventID } from "../data/types";

export const paths = {
  root: "/",
  createEvent: "/create-event",
  myEvents: "/my-events",
  event: (id: EventID) => `/event/${id}`,
};
