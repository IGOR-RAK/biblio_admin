import { ILogin } from "./../models/IUser";
import axios, { AxiosRequestConfig } from "axios";

export const API = {
  PROD: "https://salty-springs-71498.herokuapp.com",
};

export const ROUTES = {
  API: "/api",
  USER: "/user",
};

export const KEYS = {
  CARD: "/card",
};

class Api {
  URL = "https://salty-springs-71498.herokuapp.com";
  ROUTES = {
    USER: "/user",
    API: "/api",
  };
  KEYS = {
    REFRESH_TOKEN: "/refresh_token",
    LOGIN: "/login",
    INFOR: "/infor",
    CARD: "/card",
    UPLOAD: "/upload",
    DESTROY: "/destroy",
    YEAR: "/year",
    ITEM: "/item",
  };
  LOCAL_STORAGE = {
    REFRESH_TOKEN: "refresh_token",
  };

  refreshToken(rf_token: string) {
    const response = axios.post(
      `${this.URL}${this.ROUTES.USER}${this.KEYS.REFRESH_TOKEN}`,
      { rf_token }
    );
    return response;
  }

  prerformLogin(user: ILogin) {
    const response = axios.post(
      `${this.URL}${this.ROUTES.USER}${this.KEYS.LOGIN}`,
      { ...user }
    );
    return response;
  }

  getUser(token: string) {
    const response = axios.get(
      `${this.URL}${this.ROUTES.USER}${this.KEYS.INFOR}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  getCards(): Promise<any> {
    const response = axios.get(
      `${this.URL}${this.ROUTES.API}${this.KEYS.CARD}`
    );
    return response;
  }

  getCardsByYear(YEAR_ID: string) {
    const response = axios.get(
      `${this.URL}${this.ROUTES.API}${this.KEYS.CARD}/${YEAR_ID}`
    );
    return response;
  }

  createCard(
    author: string,
    public_id: string,
    url: string,
    letter: string,
    note: string = "",
    item: string,
    year: string,
    link: string = "",
    token: string
  ) {
    const response = axios.post(
      `${this.URL}${this.ROUTES.API}${this.KEYS.CARD}`,
      {
        author,
        public_id,
        url,
        letter,
        note,
        item,
        year,
        link,
      },
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  editCard(
    id:string,
    author: string,
    public_id: string,
    url: string,
    letter: string,
    note: string = "",
    item: string,
    year: string,
    link: string = "",
    token: string
  ){
    const response =  axios.put(
      `${this.URL}${this.ROUTES.API}${this.KEYS.CARD}/${id}`,
      {
        author,
        public_id,
        url,
        letter,
        note,
        item,
        year,
        link,
      },
      {
        headers: { Authorization: token },
      }
    );
    return response
  }

  uploadImage(formData: FormData, token: string) {
    const response = axios.post(
      `${this.URL}${this.ROUTES.API}${this.KEYS.UPLOAD}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    return response;
  }

  destroyImage(public_id: string, token: string) {
    axios.post(
      `${this.URL}${this.ROUTES.API}${this.KEYS.DESTROY}`,
      { public_id },
      {
        headers: { Authorization: token },
      }
    );
  }

  getYears(token: string) {
    const respond = axios.get(
      `${this.URL}${this.ROUTES.API}${this.KEYS.YEAR}`,
      {
        headers: { Authorization: token },
      }
    );
    return respond;
  }



  deleteCard(id: string, token: string) {
    const response = axios.delete(
      `${this.URL}${this.ROUTES.API}${this.KEYS.CARD}/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  getItems(token: string) {
    const response = axios.get(
      `${this.URL}${this.ROUTES.API}${this.KEYS.ITEM}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }
  createItem(token: string, title: string) {
    const response = axios.post(
      `${this.URL}${this.ROUTES.API}${this.KEYS.ITEM}`,
      { title },
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }
  deleteItem(token: string, id: string) {
    const response = axios.delete(
      `${this.URL}${this.ROUTES.API}${this.KEYS.ITEM}/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }
  editItem(token: string, id: string, title: string) {
    const response = axios.put(
      `${this.URL}${this.ROUTES.API}${this.KEYS.ITEM}/${id}`,
      { title },
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  fetchYears(token: string) {
    const response = axios.get(
      `${this.URL}${this.ROUTES.API}${this.KEYS.YEAR}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  editYear(yearID: string, title: string, isActive: boolean, token: string) {
    const response = axios.put(
      `${this.URL}${this.ROUTES.API}${this.KEYS.YEAR}/${yearID}`,
      { title, isActive },
      {
        headers: { Authorization: token },
      }
    );
    return response
  }

  createYear(token: string, title: string) {
    const response = axios.post(
      `${this.URL}${this.ROUTES.API}${this.KEYS.YEAR}`,
      { title, isActive: false },
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }

  deleteYear(token: string, id: string) {
    const response = axios.delete(
      `${this.URL}${this.ROUTES.API}${this.KEYS.YEAR}/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    return response;
  }


}

export default new Api();
