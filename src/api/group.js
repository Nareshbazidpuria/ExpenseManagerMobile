import { Axios } from "./axios";

const group = "/api/group/",
  member = "/api/user";

export const createGroupAPI = (payload) => Axios.post(group, payload);
export const groupListAPI = () => Axios.get(group);
export const groupDetailsAPI = (id) => Axios.get(group + id);
export const editGroupAPI = (id, payload) => Axios.put(group + id, payload);
export const getMemberAPI = (params) => Axios.get(member, { params });
