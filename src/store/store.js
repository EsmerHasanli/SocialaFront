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
      const res = await AuthService.register(payload);
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      document.cookie = `RefreshToken=${res.data.refreshToken}`;
      this.setAuth(true);
      return res.data.username;
    } catch (e) {
      console.log(`form data error: ${e}`);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `${e.response.data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      this.setLoading(false);
    }
  }

  async login(payload) {
    this.setLoading(true);
    try {
      const res = await AuthService.login(payload);
      console.log("res.data", res.data);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      document.cookie = `RefreshToken=${res.data.refreshToken}`;
      this.checkAuth();
      this.setAuth(true);
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
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const res = await AuthService.checkAuth();
      // console.log(res.data);
      this.setAuth(true);
      this.setUser(res.data);
    } catch (e) {
      console.log(e);
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
        await AuthService.logout(token);
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

  async getByUsername() {
    try {
      const res = await UserServices.getByUsername(this.user.userName);
      return res.data;
    } catch (e) {
      console.log("error in data fetch", e);
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
      console.log(res);
    } catch (e) {
      console.log("error in post", e);
    }
  }

  async;
}
