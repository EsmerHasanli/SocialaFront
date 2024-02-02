import axios from "axios";
import $api, { API_BASE_URL } from "../http";

export default class AuthService {
  static async register(payload) {
    return axios.post(`${API_BASE_URL}/auth/register`, payload);
  }

  static async login(payload) {
    return axios.post(`${API_BASE_URL}/auth/login`, payload);
  }

  static async logout(refreshToken) {
    return axios.post(`${API_BASE_URL}/auth/logout/${refreshToken}`);
  }

  static async checkAuth() {
    return $api.get(`${API_BASE_URL}/auth`);
  }
}
