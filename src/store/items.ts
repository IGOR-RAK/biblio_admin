
import { IItem } from "../models";
import { makeAutoObservable } from "mobx";
import api from "./../api/api";
import FetchItems from "./helpers/fetchItems";

interface IIsEdit extends IItem {  
  isEdit: boolean;
}

export default class itemsStore {
  Items = new FetchItems();
  isLoading = false;
  callback = false;
  isEdit = false;
  itemId: string = "";
  editInput: string = "";
  isNewLoading = false;
  newItem: string = "";
  isEditItem = false;
  newItemError = "";
  message = "";

  constructor() {
    makeAutoObservable(this);
  }

  setNewItem(item: string) {
    this.newItem = item;
  }

  setCallback() {
    this.callback = !this.callback;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setIsNewItemLoading(bool: boolean) {
    this.isNewLoading = bool;
  }

  setNewItemLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setItemId(id: string) {
    this.itemId = id;
  }

  setEditInput(value: string) {
    this.editInput = value;
  }

  setMessage(value: string) {
    this.message = value;
  }

  setNewError(value: string) {
    this.newItemError = value;
  }

  async createItem(token: string, isAdmin: boolean) {
    try {
      await this.Items.fetchItems(token, isAdmin);
      if (!isAdmin) return alert("You're not an admin");
      const find = this.Items.items.find((item) => item.title === this.newItem);
      console.log("find", find);
      if (find) {
        this.setNewError("Ten deskryptor już istnieje.");
      }

      if (this.newItem && !find) {
        this.setIsNewItemLoading(true);
        const res = await api.createItem(token, this.newItem);
        this.setNewItem("");
        this.callback = !this.callback;
        this.setIsNewItemLoading(false);
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async deleteItem(token: string, isAdmin: boolean, id: string) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.setNewItemLoading(true);
      const res = await api.deleteItem(token, id);
      this.setMessage(res.data.msg);
      this.newItem = "";
      this.callback = !this.callback;
      this.setNewItemLoading(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async editItem(token: string, isAdmin: boolean, id: string) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.isEditItem = true;
      const res = await api.editItem(token, id, this.editInput);
      this.setMessage(res.data.msg);
      this.setItemId("");
      this.callback = !this.callback;
      this.isEditItem = false;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    } finally {
      document.location.reload();
    }
  }

  get mapedItems() {
    if (this.Items.items.length > 0) {
      const arr: IIsEdit[] = [...this.Items.items].map((el) => {
        if (el._id === this.itemId) {
          this.editInput = el.title;
          return { ...el, isEdit: true };
        }
        return { ...el, isEdit: false };
      });
      return arr;
    }
  }
}
