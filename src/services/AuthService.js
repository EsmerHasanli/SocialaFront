import axios from "axios";
import $api, { API_BASE_URL } from "../http";

export default class AuthService {
  static async register(payload) {
    return axios.post(`${API_BASE_URL}/auth/register`, payload);
  }

  static async login(payload) {
    return axios.post(`${API_BASE_URL}/auth/login`, payload);
  }

  static async logout() {
    return axios.post(`${API_BASE_URL}/auth/logout`);
  }

  static async checkAuth() {
    return $api.get(`${API_BASE_URL}/auth`);
  }
}
