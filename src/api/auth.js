import { Axios } from "./axios";

const signup = "/pub/signup",
  login = "/pub/login",
  profile = "/api/auth/profile",
  forgotPwd = "/pub/forgot-password",
  resetPwd = "/pub/set-password",
  changePwd = "/api/auth/change-password",
  logout = "/api/auth/logout";

export const signupAPI = (payload) => Axios.post(signup, payload);
export const loginAPI = (payload) => Axios.post(login, payload);
export const profileAPI = () => Axios.get(profile);
export const editProfileAPI = (payload) => Axios.put(profile, payload);
export const changePwdAPI = (payload) => Axios.post(changePwd, payload);
export const logoutAPI = () => Axios.post(logout);
