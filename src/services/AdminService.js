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
  static async sendVerifyRequestAsync() {
    return $api.post(`${API_BASE_URL}/manage/verify`);
  }
  static async confirmOrCancelVerifyAsync(id,status) {
    return $api.put(`${API_BASE_URL}/manage/verify/${id}?status=${status}`);
  }
  static async getVerifyRequestsAsync(sortType, isDescending, skip) {
    return $api.get(`${API_BASE_URL}/manage/verifyRequests?sortType=${sortType}&desc=${isDescending}&skip=${skip}`)
  }
  static async getVerifyRequestsCountAsync() {
    return $api.get(`${API_BASE_URL}/manage/verifyRequestsCount`)
  }
}
