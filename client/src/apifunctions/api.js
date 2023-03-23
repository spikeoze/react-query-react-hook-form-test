import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});
export const getUser = async () =>
  await api.get("/user").then((res) => res.data);

export const createUser = async ({ username, email }) => {
  return await api
    .post("/user", {
      username,
      email,
    })
    .then((res) => res.data);
};

export const deleteUser = (id) => api.delete(`/user/${id}`).then((res) => res.data);
