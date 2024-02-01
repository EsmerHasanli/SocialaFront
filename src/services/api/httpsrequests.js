import axios from "axios";
import API_BASE_URL from "./api_base_url";

export async function registerUser(payload) {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/register`, payload);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
}
