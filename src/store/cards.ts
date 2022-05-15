import { makeAutoObservable } from "mobx";
import { ICard,IServerCard,IYear } from "../models";
import Api from "../api/api";

interface Event<T = EventTarget> {
  target: T;
}

export default class cardsStore {
  cards = [] as IServerCard[];
  isLoading = false;
  isImageLoading = false;
  initState: ICard = {
    author: "",
    public_id: "",
    url: "",
    letter: "",
    year: "",
    yearID: "",
    item: "",
    note: "",
    link: "",
  };
  callback = false;
  message = "";

  constructor() {
    makeAutoObservable(this);
  }

  setNote(note: string) {
    this.initState.note = note;
  }

  setLink(link: string) {
    this.initState.link = link;
  }

  setAthor(author: string) {
    this.initState.author = author.charAt(0).toUpperCase() + author.slice(1);
  }

  setLetter(author: string) {
    this.initState.letter = author.charAt(0).toLocaleLowerCase();
  }

  setCards(cards: IServerCard[]) {
    this.cards = cards;
  }

  setYear(year: string, id: string) {
    this.initState.year = year;
    this.initState.yearID = id;
  }

  setItem(item: string) {
    this.initState.item = item;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setCallback() {
    this.callback = !this.callback;
  }

  setMessage(value: string) {
    this.message = value;
  }

  async fetchCards() {
    try {
      this.setLoading(true);
      const res = await Api.getCards();
      this.setCards(res.data);
      this.setLoading(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async fetchCardsByYear(yearId: string) {
    try {
      this.setLoading(true);
      const res = await Api.getCardsByYear(yearId);
      this.setCards(res.data);
      this.setLoading(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async handleUpload(
    e: Event<HTMLInputElement>,
    isAdmin: boolean,
    token: string
  ) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files;

      if (!file) {
        alert("File not exist.");
      } else {
        if (file[0].size > 1024 * 1024)
          // 1mb
          return alert("Size too large!");

        if (file[0].type !== "image/jpeg" && file[0].type !== "image/png")
          // 1mb
          return alert("File format is incorrect.");
        let formData = new FormData();
        formData.append("file", file[0]);
        this.isImageLoading = true;
        const res = await Api.uploadImage(formData, token);
        this.initState.public_id = res.data.public_id;
        this.initState.url = res.data.url;
        const file_name = file[0].name.split("_");
        this.setAthor(file_name[0]);
        this.setLetter(file_name[0]);
        this.isImageLoading = false;
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async handleDestroy(isAdmin: boolean, token: string) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.isImageLoading = true;
      Api.destroyImage(this.initState.public_id, token);
      this.initState.public_id = "";
      this.initState.url = "";
      this.setAthor("");
      this.setLetter("");
      this.isImageLoading = false;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }

  async createCardItem(token: string, isAdmin: boolean) {
    this.setLoading(true);
    try {
      if (!isAdmin) return alert("You're not an admin");

      const res = await Api.createCard(
        this.initState.author,
        this.initState.public_id,
        this.initState.url,
        this.initState.letter,
        this.initState.note,
        this.initState.item,
        this.initState.year,
        this.initState.link,
        token
      );

      if (this.initState.yearID) {
        await Api.editYear(
          this.initState.yearID,
          this.initState.year,
          true,
          token
        );
      }

      this.setMessage(res.data.msg);
      this.callback = !this.callback;
      this.initState = {
        ...this.initState,
        author: "",
        public_id: "",
        url: "",
        letter: "",
        // year:"",
        // item:"", // save props for next card upload
        note: "",
        link: "",
      };
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
    this.setLoading(false);
  }

  async deleteCard(token: string, isAdmin: boolean, card: ICard) {
    try {
      if (!isAdmin) return alert("You're not an admin");
      this.setLoading(true);
      const cards = await Api.getCardsByYear(card.year);
      if (cards.data.length === 1) {
        const yearsRespond = await Api.getYears(token);
        const years: IYear[] = yearsRespond.data;
        const find = years.find((year) => year.title === card.year);
        if (find) {
          await Api.editYear(find._id, card.year, false, token);
        }
      }
      if (card._id) {
        const res = await Api.deleteCard(card._id, token);
        this.setMessage(res.data.msg);
        this.callback = !this.callback;
      }
      this.setLoading(false);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  }
}
