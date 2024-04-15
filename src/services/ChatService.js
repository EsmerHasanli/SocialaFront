import $api, { API_BASE_URL } from "../http";
export default class GroupService {
  static async sendAudio(formData) {
    return $api.post(`${API_BASE_URL}/chats/sendAudio`, formData);
  }
  static async getChatItems() {
    return $api.get(`${API_BASE_URL}/chats/items`)
  }
  
  static async sendMediaToChat(payload) {
    return $api.post(`${API_BASE_URL}/chats/media`, payload)
  }
}
