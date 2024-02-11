import axios from "axios";
import $api, { API_BASE_URL } from "../http";

export default class AuthService {
  static async register(payload) {
    return axios.post(`${API_BASE_URL}/auth/register`, payload);
  }

  static async confirmEmail(payload) {
    return axios.post(`${API_BASE_URL}/auth/confirm`, payload);
  }

  static async login(payload) {
    return axios.post(`${API_BASE_URL}/auth/login`, payload);
  }

  static async logout(refreshToken) {
    return $api.post(`${API_BASE_URL}/auth/logout/${refreshToken}`);
  }

  static async checkAuth() {
    return $api.get(`${API_BASE_URL}/auth`);
  }

  static async resetPassword(payload) {
    return axios.post(`${API_BASE_URL}/auth/reset`, payload);
  }
  
  static async setNewPassword(payload) {
    return axios.put(`${API_BASE_URL}/auth/newPassword`, payload);
  }
}
