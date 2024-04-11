import $api, { API_BASE_URL } from "../http";
export default class GroupService {
  static async sendAudio(formData) {
    return $api.post(`${API_BASE_URL}/chat/sendAudio`, formData);
  }
}
