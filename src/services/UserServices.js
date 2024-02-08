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
  static async followUser(username) {
    return await $api.post(`${API_BASE_URL}/users/${username}/follow`)
  }
  static async unfollowUser(username) {
    return await $api.delete(`${API_BASE_URL}/users/follows/cancel/${username}`)
  }
  static async checkAccountPrivate(username) {
    return await $api.get(`${API_BASE_URL}/users/checkPrivate/${username}`)
  }
  static async editAvatar(payload) {
    return await $api.put(`${API_BASE_URL}/settings/photo`, payload)
  }
  static async editBackground(payload) {
    return await $api.put(`${API_BASE_URL}/settings/background`, payload)
  }
  static async editDesription(payload) {
    return await $api.post(`${API_BASE_URL}/settings/description`, payload)
  }
  static async editBio(payload) {
    return await $api.put(`${API_BASE_URL}/settings/bio`, payload)
  }
  static async editSocialLinks(payload) {
    return await $api.put(`${API_BASE_URL}/settings/social/`, payload)
  }
  static async editNotifications(payload) {
    return await $api.put(`${API_BASE_URL}/settings/notification`, payload)
  }
  static async editLikePhoto(payload) {
    return await $api.put(`${API_BASE_URL}/settings/likePhoto`, payload)
  }
}