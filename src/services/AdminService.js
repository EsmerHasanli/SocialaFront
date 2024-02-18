import $api, { API_BASE_URL } from "../http";

export default class AdminService {
  static async getManage() {
    return $api.get(`${API_BASE_URL}/manage`);
  }

  static async getSearchedUsers(searchTerm, skip) {
    return $api.get(`${API_BASE_URL}/manage/users?searchTerm=${searchTerm}&skip=${skip}`);
  }

  static async setRole(userName, role) {
    return $api.post(`${API_BASE_URL}/manage/role`, userName, role);
  }

  static async setRoles(userName, roles) {
    return $api.post(`${API_BASE_URL}/manage/roles`, userName, roles);
  }
  
  static async deleteRole(userName, role) {
    return $api.delete(`${API_BASE_URL}/manage/roles`, userName, role);
  }
}
