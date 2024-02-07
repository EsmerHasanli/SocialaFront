import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
import UserServices from "../services/UserServices";
import PostService from "../services/PostService";

export default class Store {
  user = {};
  isLoading = false;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }
  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  
  async register(payload) {
    this.setLoading(true);
    try {
      await AuthService.register(payload);
      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Please, check your email and confirm your account!"
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops, something went wrong!",
        text: e.response.data?.message,
      });
    } finally {
      this.setLoading(false);
    }
  }
  async confirmEmail(payload){
    this.setLoading(true);
    try {
      const res = await AuthService.confirmEmail(payload);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      document.cookie = `RefreshToken=${res.data.refreshToken};expires=${res.data.expiresAt};path=/;`
      await this.checkAuth();
      return res.data.username;
    } catch (e) {
      console.log(e.response);
      Swal.fire({
        icon: "error",
        title: "Oops, something went wrong!",
        text: e.response.data?.message,
      });
    } finally {
      this.setLoading(false);
    }
  }
  async login(payload) {
    this.setLoading(true);
    try {
      const res = await AuthService.login(payload);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      document.cookie = `RefreshToken=${res.data.refreshToken};expires=${res.data.expiresAt};path=/;`
      await this.checkAuth();
      return res.data.username;
    } catch (e) {
      console.log(e.response.data);
      if (e.response.data.statusCode == 423) {
        let timerInterval;
        Swal.fire({
          icon: "error",
          title: `${e.response.data.message}`,
          html: "Try after in <b></b> minutes!",
          timer:
            e.response.data.minutes * 60000 + e.response.data.seconds * 1000,
          timerProgressBar: true,

          didOpen: () => {
            Swal.showLoading();
            let minutes = e.response.data.minutes;
            let seconds = e.response.data.seconds;
            const timer = Swal.getPopup().querySelector("b");
            let totalsec = minutes * 60 + seconds - 2;
            timerInterval = setInterval(() => {
              var minutesRemaining = Math.floor(totalsec / 60);
              var secondsRemaining = totalsec % 60;
              totalsec = totalsec - 1;

              timer.textContent = `0${minutesRemaining}:${
                secondsRemaining >= 10
                  ? secondsRemaining
                  : `0${secondsRemaining}`
              }`;
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
      else if (e.response.data.statusCode == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops, something went wrong!",
          text: e.response.data?.message,
        });
      }
    } finally{
      this.setLoading(false);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const res = await AuthService.checkAuth();
      console.log(res.data);
      this.setUser(res.data);
      this.setAuth(true);
    } catch (e) {
      localStorage.removeItem("token");
    } finally {
      this.setLoading(false);
    }
  }
  async logout() {
    this.setLoading(true);
    try {
      let token = null;
      var cookiesArray = document.cookie.split("; ");
      for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].split("=");
        if (cookie[0] === "RefreshToken") {
          token = decodeURIComponent(cookie[1]);
        }
      }
      if (token) {
        try {
          await AuthService.logout(token);
        }
        catch (e) {
          console.log(e.response)
        }
      }

      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getByUsername(username) {
    // this.setLoading(true)
    try {
      const res = await UserServices.getByUsername(username);
      console.log(res.data)
      return res;
    } catch (e) {
      return e.response.data
    }finally{
      // this.setLoading(false)
    }
  }
  async getFollowers() {
    try {
      const res = await UserServices.getFollowers(this.user.userName);
      return res.data;
    } catch (e) {
      console.log("error in data fetch", e);
    }
  }
  async getFollows() {
    try {
      const res = await UserServices.getFollows(this.user.userName);
      return res.data;
    } catch (e) {
      console.log("error in data fetch", e);
    }
  }

  async createPost(payload) {
    try {
      const res = await PostService.createPost(payload);
      return res.data;
    } catch (e) {
      console.log("error in post", e);
    }
  }
  async getPosts(username){
    try{
      const res = await PostService.getPosts(username);
      return res.data
    }catch (e) {
      console.log('error in getting posts', e);
    }
  }
  
  async postComment(payload) {
    try {
      const res = await PostService.postComment(payload);
      return res.data;
    } catch (e) {
      console.log("error in post", e);
    }
  }
  async likeComment(id) {
    try {
      const res  = await PostService.likeComment(id);
      return res
    } catch (e) {
      
      console.log("error in post", e);
    }
  }
  async replyComment(id, text) {
    try {
      const paylaod = {id, text}
      const res  = await PostService.replyComment(paylaod);
      return res.data
    } catch (e) {
      
      console.log("error in post", e);
    }
  }
  async getPostComments(postId, skip) {
    try {
      const res = await PostService.getComments(postId, skip);
      console.log(res.data)
      return res.data;
    } catch (e) {
      console.log("error in getting comments", e);
    }
  }
  async getCommentReplies(commentId, skip) {
    try {
      console.log(commentId)
      const res = await PostService.getCommentReplies(commentId, skip);
      console.log(res)
      return res.data;
    } catch (e) {
      console.log("error in getting replies", e);
    }
  }
  async likeCommentReply(replyId) {
    try {
      const res = await PostService.likeCommentReply(replyId);
      console.log(res);
      return res;
    } catch (e) {
      console.log("error in like reply", e);
    }
  }

  async likePost(postId){
    try {
      const res = await PostService.likePost(postId);
      console.log(res);
      return res;
    } catch (e) {
      console.log("error in like post", e);
    }
  }
  async getPostLikes(postId){
    try {
      const res = await PostService.getPostLikes(postId);
      console.log(res.data)
      return res.data;
    } catch (e) {
      console.log("error in getting post's likes", e);
    }
  }
}

