import $api, { API_BASE_URL } from "../http";
export default class GroupService {
  static async createGroup(payload) {
    return $api.post(`${API_BASE_URL}/groups`, payload);
  }
  static async getGroupItems() {
    return $api.get(`${API_BASE_URL}/groups/items`)
  }
}
