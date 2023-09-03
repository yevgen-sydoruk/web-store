import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", { email, password, role: "USER" });

  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.accessToken);
  return jwt_decode(data.accessToken); //needed for work with user data
};

export const logout = async () => {
  const { data } = await $authHost.post("api/user/logout");
  localStorage.removeItem("token");
};

export const checkIfAuth = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token.accessToken);
  return jwt_decode(data.token.accessToken); //needed for work with user data
};
