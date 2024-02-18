import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import Swal from "sweetalert2";
import UserServices from "../services/UserServices";
import PostService from "../services/PostService";
import StoriesServices from "../services/StoriesServices";
import AdminService from "../services/AdminService";

export default class Store {
  user = {};
  isLoading = true;
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

  //auth service
  async register(payload) {
    this.setLoading(true);
    try {
      await AuthService.register(payload);
      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Please, check your email and confirm your account!",
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
  async confirmEmail(payload) {
    this.setLoading(true);
    try {
      const res = await AuthService.confirmEmail(payload);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      document.cookie = `RefreshToken=${res.data.refreshToken};expires=${res.data.expiresAt};path=/;`;
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
      document.cookie = `RefreshToken=${res.data.refreshToken};expires=${res.data.expiresAt};path=/;`;
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
      } else if (e.response.data.statusCode == 400) {
        Swal.fire({
          icon: "error",
          title: "Oops, something went wrong!",
          text: e.response.data?.message,
        });
      }
    } finally {
      this.setLoading(false);
    }
  }
  async checkAuth() {
    this.setLoading(true);
    try {
      const res = await AuthService.checkAuth();
      console.log(res.data)
      localStorage.setItem("userName", res.data.userName)
      this.setUser(res.data);
      this.setAuth(true);
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
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
        } catch (e) {
          this.showErrorAlertWithSound(
            e.response.data.message || "Something went wrong!"
          );
        }
      }

      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    } finally {
      this.setLoading(false);
    }
  }

  //user info
  async getByUsername(username) {
    //this.setLoading(true)
    try {
      const res = await UserServices.getByUsername(username);
      console.log(res.data);
      return res;
    } catch (e) {
      console.log(e.response)
      //return e.response.data;
    } finally {
     //this.setLoading(false)
    }
  }
  async getFollowers(username) {
    //this.setLoading(true)
    try {
      const res = await UserServices.getFollowers(username);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
    //finally {this.setLoading(false)}
  }
  async getFollows(username) {
    // this.setLoading(true)
    try {
      const res = await UserServices.getFollows(username);
      return res.data;
    } 
    catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
    // finally {this.setLoading(false)}
  }

  //posts
  async createPost(payload) {
    try {
      const res = await PostService.createPost(payload);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getPosts(username) {
    try {
      const res = await PostService.getPosts(username);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }

  //post comments
  async postComment(payload) {
    try {
      const res = await PostService.postComment(payload);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async likeComment(id) {
    try {
      const res = await PostService.likeComment(id);
      return res;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async replyComment(id, text) {
    try {
      const paylaod = { id, text };
      const res = await PostService.replyComment(paylaod);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getPostComments(postId, skip) {
    try {
      const res = await PostService.getComments(postId, skip);
      console.log(res.data);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getCommentReplies(commentId, skip) {
    try {
      console.log(commentId);
      const res = await PostService.getCommentReplies(commentId, skip);
      console.log(res);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async likeCommentReply(replyId) {
    try {
      const res = await PostService.likeCommentReply(replyId);
      console.log(res);
      return res;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }

  //post likes
  async likePost(postId) {
    try {
      const res = await PostService.likePost(postId);
      console.log(res);
      return res;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getPostLikes(postId) {
    try {
      const res = await PostService.getPostLikes(postId);
      console.log(res.data);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }

  //follow unfollow
  async followUser(username) {
    try {
      const res = await UserServices.followUser(username);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async unfollowUser(username) {
    try {
      await UserServices.unfollowUser(username);
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async deleteFollower(username) {
    try {
      await UserServices.deleteFollower(username);
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async confirmFollower(id) {
    try {
      await UserServices.confirmFollower(id);
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }

  //user settings
  async checkAccountPrivate(username) {
    try {
      const res = await UserServices.checkAccountPrivate(username);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async editSocialLinks(paylaod) {
    this.setLoading(true);
    try {
      const res = await UserServices.editSocialLinks(paylaod);
      this.showSuccessAlert(`Successfully changed!`);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    } finally {
      this.setLoading(false);
    }
  }
  async editBio(paylaod) {
    console.log("paylaod", paylaod);
    try {
      const res = await UserServices.editBio(paylaod);
      // console.log(res);
      this.showSuccessAlert(`Successfully changed!`);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async editAvatar(paylaod) {
    try {
      const res = await UserServices.editAvatar(paylaod);
      // console.log(res);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async editBackground(paylaod) {
    try {
      const res = await UserServices.editBackground(paylaod);
      // console.log(res);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async likeAvatar(username) {
    console.log("username", username);
    try {
      const res = await UserServices.likeAvatar(username);
      console.log(res);
      return res;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getSocialLinks() {
    try {
      const res = await UserServices.getSocialLinks();
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getDescription() {
    try {
      const res = await UserServices.getDescription();
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async editDescription(payload) {
    this.setLoading(true);
    try {
      const res = await UserServices.editDescription(payload);
      const email = payload.get("email");
      if (this.user.email != email) {
        await this.logout();
        this.showErrorAlertWithSound(
          `For continue, you must confirm your new email ${email}!`
        );
        //localStorage.removeItem("emailConfirm")
      } else {
        this.showSuccessAlert(`Succesfully changed!`);
        return res.data;
      }
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    } finally {
      this.setLoading(false);
    }
  }
  async putNotificationSettings(payload) {
    try {
      const res = await UserServices.editNotifications(payload);
      this.showSuccessAlert(`Succesfully changed!`);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }
  async getNotifySettings() {
    try {
      const res = await UserServices.getNotificationsSettings();
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(
        e.response.data.message || "Something went wrong!"
      );
    }
  }

  //stories
  async createStory(payload) {
    this.setLoading(true)
    try {
      const res = await StoriesServices.createStory(payload);
      this.showSuccessAlert();
    } catch (e) {
      this.showErrorAlertWithSound(e.response.data.message)
    }
    this.setLoading(false)
  }
  async getStories() {
    try {
      const res = await StoriesServices.getStories();
      return res.data;
    } catch (e) {
      console.log("error in getting stories", e);
    }
  }
  async getCurrentUserItems() {
    try {
      const res = await StoriesServices.getCurrentUserItems();
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }
  async getStoryItems(storyId) {
    try {
      const res = await StoriesServices.getStoryItems(storyId);
      console.log(res);
      return res.data;
    } catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }
  async deleteStory(storyId) {
    try {
      const res = await StoriesServices.deleteStory(storyId);
      console.log(res);
      return res;
    } catch (e) {
      console.log("error in deleting story", e);
    }
  }
  async watchStory(storyId) {
    try {
      const res = await StoriesServices.watchStory(storyId);
      console.log(res)
    }
    catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }

  //reset-password
  async resetPassword(payload) {
    this.setLoading(true)
    try {
      await AuthService.resetPassword(payload);
      const email = payload.get("email");
      this.showSuccessAlert(`We sent to your ${email} reset link!`);
    } catch (e) {
      this.showErrorAlertWithSound(e.response.data.errors.email);
    } finally{
      this.setLoading(false);
    }
  }
  async setNewPassword(payload) {
    try {
      const res = await AuthService.setNewPassword(payload);
      this.showSuccessAlert(`You succesfully changed your password!`);
      return res;
    } catch (e) {
      console.log("error in set new pass", e);
      this.showErrorAlertWithSound(e.response.data.errors.email);
    }
  }

  showErrorAlertWithSound(message, alternativeMessage = null) {
    var audio = new Audio("/src/assets/sounds/err_sound.mp3");
    audio.play();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message || alternativeMessage,
    });
  }
  showSuccessAlert(message, alternativeMessage = null) {
    var audio = new Audio("/src/assets/sounds/success_alert.wav");
    audio.play();
    Swal.fire({
      title: "Great!",
      text: message || alternativeMessage,
      icon: "success",
    });
  }

  async checkNotifications(payload) {
    try {
      const res = await UserServices.checkNotifications(payload);
      console.log(res)
    }
    catch (e) {
      console.log("error in checking notifications", e);}
  }

  //admin
  async getManage() {
    try {
      const res = await AdminService.getManage();
      console.log(res)
      return res.data
    }
    catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }
  async getSearchedUser(searchTerm, skip) {
    try {
      const res = await AdminService.getSearchedUser(searchTerm, skip);
      console.log(res)
      return res.data
    }
    catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }
  async setRole(userName, role) {
    try {
      const res = await AdminService.setRole(userName, role);
      console.log(res)
      return res.data
    }
    catch (e) {
      console.log(e);
      this.showErrorAlertWithSound(e.response.message)
    }
  }
  async setRoles(userName, roles) {
    try {
      const res = await AdminService.setRoles(userName, roles);
      console.log(res)
      return res.data
    }
    catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }
  async deleteRole(userName, role) {
    try {
      const res = await AdminService.deleteRole(userName, role);
      console.log(res)
      return res.data
    }
    catch (e) {
      this.showErrorAlertWithSound(e.response.message)
    }
  }

  //feed
  async getFeedPostsAsync(skip) {
    //this.setLoading(true);
    try {
      const res = await PostService.getFeedPostsAsync(skip)
      console.log(res.data)
      return res.data
    }
    catch (e) {
      this.showErrorAlertWithSound(e.response.message || "Error occured!")
    }
    //finally {this.setLoading(false)}
  }
}