import { EventID } from "../data/types";

export const paths = {
  root: "/",
  createEvent: "/create-event",
  myEvents: "/my-events",
  event: (id: EventID) => `/event/${id}`,
  scanQr: (id: EventID) => `/scan-qr/${id}`,
  showQr: (id: EventID) => `/show-qr/${id}`,
};
