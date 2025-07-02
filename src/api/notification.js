import { Axios } from "./axios";

const alert = "/api/notification/";

export const alertListAPI = (params) => Axios.get(alert, { params });
export const readAlertAPI = (id) => Axios.patch(alert + id);
export const readAllAlertAPI = (payload) => Axios.put(alert, payload);
