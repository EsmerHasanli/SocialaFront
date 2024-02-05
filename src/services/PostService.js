import $api, { API_BASE_URL } from "../http";

export default class PostService{
    static async createPost(payload){
        return $api.post(`${API_BASE_URL}/posts`, payload)
    }
}