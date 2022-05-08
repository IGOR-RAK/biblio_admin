import { API } from './../api/api';
import IUser from "../models/IUser";
import {makeAutoObservable} from "mobx";
import axios from 'axios';


interface ILogin{    
    email:string
    password:string
}

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isAdmin= false;
    isLoading = false;
    token=""

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

   async refreshToken (){
       try {
        const res = await axios.get(`https://salty-springs-71498.herokuapp.com/user/refresh_token`,
        {
            withCredentials:true
        }
        )
        console.log("res.data.",res.data.accesstoken)
   
           this.setToken(res.data.accesstoken)

           setTimeout(() => {
               this.refreshToken()
           }, 10 * 60 * 1000)
           
       } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)          
        
        alert(message)
           
       }
              
        
        
    }

    async login (user:ILogin){
        try {         
          
           
           await axios.post(`https://salty-springs-71498.herokuapp.com/user/login`, {...user})
             // const res1= await axios.post(`${API.PROD}/user/login`, {...user})
            // this.setToken(res1.data.accesstoken) 
            // const res = await axios.get(`${API.PROD}/user/infor`, {
            //     headers: {Authorization: res1.data.accesstoken}
            // })     
            // this.setAuth(true)                
            // res.data?.user?.role === 1 ? this.setAdmin(true) : this.setAdmin(false)

       
          localStorage.setItem('first_login', "true")
            
         window.location.href = "/";
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)          
            
            alert(message)
        }
    }

    async logout (){
        await axios.get(`https://salty-springs-71498.herokuapp.com/user/logout`)          
        localStorage.removeItem('first_login')
        window.location.href = "/";  
    }

    async getUser(token:string) {
        try {
            this.setLoading(true)
            const res = await axios.get(`https://salty-springs-71498.herokuapp.com/user/infor`, {
                headers: {Authorization: token}
            })                           
            this.setAuth(true)                
            res.data?.user?.role === 1 ? this.setAdmin(true) : this.setAdmin(false)
            this.setLoading(false)
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
    }

    // async login(email: string, password: string) {
    //     try {
    //         const response = await AuthService.login(email, password);
    //         console.log(response)
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    // async registration(email: string, password: string) {
    //     try {
    //         const response = await AuthService.registration(email, password);
    //         console.log(response)
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    // async logout() {
    //     try {
    //         const response = await AuthService.logout();
    //         localStorage.removeItem('token');
    //         this.setAuth(false);
    //         this.setUser({} as IUser);
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    // async checkAuth() {
    //     this.setLoading(true);
    //     try {
    //         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    //         console.log(response);
    //         localStorage.setItem('token', response.data.accessToken);
    //         this.setAuth(true);
    //         this.setUser(response.data.user);
    //     } catch (e) {
    //         console.log(e.response?.data?.message);
    //     } finally {
    //         this.setLoading(false);
    //     }
    // }
}