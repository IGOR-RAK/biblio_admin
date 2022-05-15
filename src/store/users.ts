import Api from "../api/api";
import { IUser } from "../models";
import { makeAutoObservable } from "mobx";
import { ILogin } from "../models";

const refresh_token = Api.LOCAL_STORAGE.REFRESH_TOKEN;

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isAdmin = false;
  isLoading = false;
  token = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setAdmin(bool: boolean) {
    this.isAdmin = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setToken(token: string) {
    this.token = token;
  }

  async refreshToken() {
    try {
      const rf_token = localStorage.getItem(`${refresh_token}`);
      if (rf_token) {
        const res = await Api.refreshToken(rf_token);
        this.setToken(res.data.accesstoken);
      } else {
        this.token = "";
        window.location.href = "/";
      }

      setTimeout(() => {
        this.refreshToken();
      }, 10 * 60 * 1000);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async login(user: ILogin) {
    this.setLoading(true);
    try {
      const res = await Api.prerformLogin(user);
      localStorage.setItem(`${refresh_token}`, `${res.data.refreshtoken}`);
      window.location.href = "/";
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
    this.setLoading(false);
  }

  async logout() {
    localStorage.removeItem(`${refresh_token}`);
    this.token = "";
    window.location.href = "/";
  }

  async getUser(token: string) {
    this.setLoading(true);
    try {
      const res = await Api.getUser(token);
      this.setAuth(true);
      res.data?.user?.role === 1 ? this.setAdmin(true) : this.setAdmin(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
    this.setLoading(false);
  }
}
