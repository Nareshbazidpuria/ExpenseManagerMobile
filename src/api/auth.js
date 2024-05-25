import { Axios } from "./axios";

const signup = "/pub/signup",
  login = "/pub/login";

export const signupAPI = (payload) => Axios.post(signup, payload);
export const loginAPI = (payload) => Axios.post(login, payload);
