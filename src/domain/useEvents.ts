import { EventID } from "../data/types";

export const useEvents = () => {
  return { events };
};

export const useEvent = (id: EventID) => {
  return { event: events.find((item) => item.id === id) };
};

const events = [
  {
    id: "1",
    image: "https://picsum.photos/seed/696/3000/2000",
    title: "Plaża Mamry Węgorzewo",
    date: "28 - 29 Czerwca",
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/696/3000/2000",
    title: "Plaża Mamry Węgorzewo",
    date: "28 - 29 Lipca",
  },
];
