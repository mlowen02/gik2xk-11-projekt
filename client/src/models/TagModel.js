import api from "../api.js";

export async function getAll() {
  const result = await api.get("/tags");

  if (result.status === 200) return result.data;

  console.log(result.status);
  console.log(result.data);
  return [];
}
