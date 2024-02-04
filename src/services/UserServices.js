import $api, { API_BASE_URL } from "../http";

export default class UserServices {
  static async getByUsername(username) {
    return  await $api.get(`${API_BASE_URL}/users/${username}`)
  }
  static async getFollowers(username) {
    return await $api.get(`${API_BASE_URL}/users/${username}/followers`)
  }
  static async getFollows(username) {
    return await $api.get(`${API_BASE_URL}/users/${username}/follows`)
  }
}