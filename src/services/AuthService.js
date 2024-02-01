import $api from "../http";

export async function login(email, password) {
  try {
    const response = await $api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registration(payload) {
  try {
    const response = await $api.post('/register', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await $api.post('/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}
