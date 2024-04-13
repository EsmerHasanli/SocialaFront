import $api, { API_BASE_URL } from "../http";
export default class MessageService {
  static async getChatAndGroupsCount() {
    return $api.get(`${API_BASE_URL}/messages/count`);
  }
}
