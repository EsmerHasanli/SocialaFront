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
  static async deleteFollower(username) {
    return await $api.delete(`${API_BASE_URL}/users/followers/cancel/${username}`)
  }
  static async confirmFollower(id) {
    return await $api.post(`${API_BASE_URL}/users/followers/confirm/${id}`)
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
  static async editDescription(payload) {
    return await $api.post(`${API_BASE_URL}/settings/description`, payload)
  }
  static async getDescription() {
    return await $api.get(`${API_BASE_URL}/settings/description`)
  }
  static async editBio(payload) {
    return await $api.put(`${API_BASE_URL}/settings/bio`, payload)
  }
  static async editSocialLinks(payload) {
    return await $api.put(`${API_BASE_URL}/settings/social`, payload)
  }
  static async getSocialLinks() {
    return await $api.get(`${API_BASE_URL}/settings/social`)
  }
  static async editNotifications(payload) {
    return await $api.put(`${API_BASE_URL}/settings/notification`, payload)
  }
  static async getNotificationsSettings() {
    return await $api.get(`${API_BASE_URL}/settings/notification`)
  }
  static async likeAvatar(payload) {
    return await $api.put(`${API_BASE_URL}/settings/likePhoto`, payload)
  }
  static async checkNotifications(payload) {
    return await $api.put(`${API_BASE_URL}/settings/notifications/check`, payload)
  }
  static async searchNavbarUsers(searchTerm, skip) {
    return await $api.get(`${API_BASE_URL}/users/search?searchTerm=${searchTerm}&skip=${skip}`)
  }
}