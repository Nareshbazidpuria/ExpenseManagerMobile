import { Axios } from "./axios";

const group = "/api/group",
  member = "/api/user";

export const createGroupAPI = (payload) => Axios.post(group, payload);
export const groupListAPI = () => Axios.get(group);
export const getMemberAPI = (params) => Axios.get(member, { params });
