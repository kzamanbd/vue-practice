import axios from "@/plugins/axios";

export const currentUser = () => axios.get("/auth/current-user");
export const logout = () => axios.get("/auth/logout");
