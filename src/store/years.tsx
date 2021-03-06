import { makeAutoObservable } from "mobx";
import { IYear } from "../models";
import Api from "./../api/api";
import FetchYears from "./helpers/fetchYears";

interface IIsEdit extends IYear {
  isEdit: boolean;
}

export default class yearsStore {
  start = 1950;
  finish = 2010;

  Years = new FetchYears();
  year: string = "";
  isLoading = false;
  newYear: string = "";
  isNewLoading = false;
  yearId: string = "";
  editInput: string = "";
  isEditYear = false;
  callback = false;
  newYearcallback = false;
  newYearError = "";
  message = "";

  constructor() {
    makeAutoObservable(this);
  }

  setYear(year: string) {
    this.year = year;
  }
  setNewYear(year: string) {
    this.newYear = year;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setNewYearLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setYearId(id: string) {
    this.yearId = id;
  }

  setEditInput(value: string) {
    this.editInput = value;
  }

  setMessage(value: string) {
    this.message = value;
  }

  setNewError(value: string) {
    this.newYearError = value;
  }

  async createYear(token: string, isAdmin: boolean) {
    try {
      if (!isAdmin) return alert("You're not an admin");

      const find = this.Years.years.find((year) => year.title === this.newYear);
      if (this.newYear && !find) {
        this.setNewYearLoading(true);
        const res = await Api.createYear(token, this.newYear);
        this.setMessage(res.data.msg);
        this.newYear = "";
        this.callback = !this.callback;
        this.setNewYearLoading(false);
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async deleteYear(token: string, isAdmin: boolean, id: string) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.setNewYearLoading(true);
      const res = await Api.deleteYear(token, id);
      this.setMessage(res.data.msg);
      this.newYear = "";
      this.callback = !this.callback;
      this.setNewYearLoading(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async editYear(
    token: string,
    isAdmin: boolean,
    id: string,
    isActive: boolean
  ) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.isEditYear = true;    
      const res = await Api.editYear(id, this.editInput, isActive, token);
      this.setMessage(res.data.msg);
      this.setYearId("");
      this.callback = !this.callback;
      this.isEditYear = false;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  get mapedYears() {
    if (this.Years.years.length > 0) {
      const arr: IIsEdit[] = [...this.Years.years].map((el) => {
        if (el._id === this.yearId) {
          this.editInput = el.title;
          return { ...el, isEdit: true };
        }
        return { ...el, isEdit: false };
      });
      return arr;
    }
  }

  get allowedYears() {
    let years: string[] = [];
    let i = this.start;
    while (i !== this.finish) {
      i = i + 1;
      years.push(i.toString());
    }
    return years;
  }
}
