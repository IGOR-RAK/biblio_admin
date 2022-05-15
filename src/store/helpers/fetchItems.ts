import { makeAutoObservable } from "mobx";
import Api from "../../api/api";
import {IItem} from "../../models";


export default class FetchItems {
  items: IItem[] = [];
  isLoading = false;
  callback = false;

  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: IItem[]) {
    this.items = items;
  }

  setCallback() {
    this.callback = !this.callback;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async fetchItems(token: string, isAdmin: boolean) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.setLoading(true);
      const res = await Api.getItems(token);
      this.setItems(res.data);
      this.setLoading(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }
}
