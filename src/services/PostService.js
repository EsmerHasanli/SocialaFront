import $api, { API_BASE_URL } from "../http";

export default class PostService{
    static async getPosts(username){
        return $api.get(`${API_BASE_URL}/posts/${username}`)
    }

    static async createPost(payload){
        return await $api.post(`${API_BASE_URL}/posts`, payload)
    }

    static async postComment(payload){
        console.log('service', payload);
        return await $api.post(`${API_BASE_URL}/posts/${payload.id}/comment`, payload.text)
    }
}