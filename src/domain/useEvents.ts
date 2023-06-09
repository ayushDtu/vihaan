import { EventID } from "../data/types";

export const useEvents = () => {
  return { events };
};

export const useEvent = (id: EventID) => {
  return { event: events.find((item) => item.id === id) };
};

const events = [
  {
    //   image:
    // "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1322277517%2Fphoto%2Fwild-grass-in-the-mountains-at-sunset.jpg",

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
