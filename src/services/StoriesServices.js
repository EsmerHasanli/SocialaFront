import $api, { API_BASE_URL } from "../http";

export default class StoriesServices {
  static async createStory(payload) {
    return await $api.post(`${API_BASE_URL}/stories`, payload);
  }

  static async getStories() {
    return await $api.get(`${API_BASE_URL}/stories`);
  }

  static async getCurrentUserItems() {
    return await $api.get(`${API_BASE_URL}/stories/currentUserItems`)
  }

  static async getStoryItems(storyId) {
    return await $api.get(`${API_BASE_URL}/stories/items/${storyId}`)
  }

  static async deleteStory(storyId) {
    return await $api.delete(`${API_BASE_URL}/stories/item/${storyId}`)
  }

  static async watchStory(storyId) {
    return await $api.post(`${API_BASE_URL}/stories/watch/${storyId}`)
  }
  static async getWatchers(storyId) {
    return await $api.get(`${API_BASE_URL}/stories/watchers/${storyId}`)
  }
}
