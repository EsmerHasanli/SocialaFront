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
      document.cookie = `RefreshToken = ${res.data.refreshToken} expires = ${res.data.expiresAt}`;
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
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      document.cookie = `RefreshToken = ${res.data.refreshToken} expires = ${res.data.expiresAt}`;
      this.setAuth(true);
      return res.data.username
    } catch (e) {
      console.log(e);
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
    try{
      const res = await UserServices.getByUsername(this.user.userName);
      return res.data
    }
    catch(e){
      console.log("error in data fetch", e);
    }
  }
  async getFollowers() {
    try{
      const res = await UserServices.getFollowers(this.user.userName);
      return res.data
    }
    catch(e){
      console.log("error in data fetch", e);
    }
  }
  async getFollows() {
    try{
      const res = await UserServices.getFollows(this.user.userName);
      return res.data
    }
    catch(e){
      console.log("error in data fetch", e);
    }
  }

  async postData(payload){
    try{
      const res = await PostService.postData(payload)
      return res.data
    }
    catch(e){
      console.log("error in post", e);
    }
  }
}
