import $api from "../http";

export async function getUsers() {
  try {
    const response = await $api.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
}


