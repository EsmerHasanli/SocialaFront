import axios from "axios";
import{ API_BASE_URL } from "../http";

export default class UserServices {
  static async getByUsername(username) {
    return await axios.get(`${API_BASE_URL}/${username}`);
  }
}