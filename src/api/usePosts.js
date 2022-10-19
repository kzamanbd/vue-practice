import axios from "@/plugins/axios";

export const getAllPosts = () => axios.get("/posts");
