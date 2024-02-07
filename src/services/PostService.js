import $api, { API_BASE_URL } from "../http";

export default class PostService{
    static async getPosts(username){
        return $api.get(`${API_BASE_URL}/posts/${username}`)
    }

    static async createPost(payload){
        return await $api.post(`${API_BASE_URL}/posts`, payload)
    }

    static async postComment(payload){
        return await $api.post(`${API_BASE_URL}/posts/comment`, payload)
    }
    static async replyComment(payload){
        return await $api.post(`${API_BASE_URL}/posts/comment/reply`, payload)
    }

    static async likeComment(id) {
        return await $api.post(`${API_BASE_URL}/posts/comment/${id}/like`)
    }
    static async getComments(postId, skip){
        return await $api.get(`${API_BASE_URL}/posts/${postId}/comments?skip=${skip}`)
    }
    static async getCommentReplies(commentId, skip){
        return await $api.get(`${API_BASE_URL}/posts/comment/${commentId}/replies?skip=${skip}`)
    }

    static async likePost(postId){
        return await $api.post(`${API_BASE_URL}/posts/${postId}/like`)
    }
    static async getPostLikes(postId){
        return await $api.get(`${API_BASE_URL}/posts/${postId}/likes`)
    }
    static async likeCommentReply(replyId){
        return await $api.post(`${API_BASE_URL}/posts/comment/${replyId}/like`)
    }
}