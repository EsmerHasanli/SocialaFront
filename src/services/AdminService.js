import $api, { API_BASE_URL } from "../http";

export default class AdminService {
  static async getManage() {
    return $api.get(`${API_BASE_URL}/manage`);
  }

  static async getSearchedUsers(searchTerm, skip) {
    return $api.get(`${API_BASE_URL}/manage/users?searchTerm=${searchTerm}&skip=${skip}`);
  }
  static async changeRoles(payload) {
    return $api.put(`${API_BASE_URL}/manage/roles`, payload);
  }
}
