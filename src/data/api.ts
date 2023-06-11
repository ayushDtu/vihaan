import { Api } from "./generated-api";
import { useStore } from "../domain/store";

export const baseURL = "https://689c-77-78-80-244.eu.ngrok.io";
export const api = new Api({
  baseURL,
});

api.instance.interceptors.request.use(async (request) => {
  const token = useStore.getState().token;
  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
