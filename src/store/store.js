import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

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
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      this.setAuth(true);
      return res.data.username;
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
  async login(payload) {
    this.setLoading(true);
    try {
      const res = await AuthService.login(payload);
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      this.setAuth(true);
      console.log(res.data);
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
      console.log(res.data);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
