
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import IYears from "../../models/IYears";
import { API } from '../../api/api';







export default class FetchYears{
      years:IYears[] = [] ;     
      isLoading = false; 
      callback=false;   

    constructor() {
        makeAutoObservable(this);
    }

    setYears(years:IYears[]){
        this.years = years;
    }

    
    setCallback(){
        this.callback = !this.callback
    }    

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async fetchYears(token:string,isAdmin:boolean) {
        try {
            if(!isAdmin) return alert("You're not an admin")
            this.setLoading(true)
            const res = await axios.get(`${API.PROD}/api/year`,{
                headers: {Authorization: token}
            });                                    
            this.setYears(res.data);   
            this.setLoading(false)
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
    }

         
     }

 
     
   
    



 
