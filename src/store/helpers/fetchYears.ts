
import {makeAutoObservable} from "mobx";
import {IYear} from "../../models";
import Api from '../../api/api';

export default class FetchYears{
      years:IYear[] = [] ;     
      isLoading = false; 
      callback=false;   

    constructor() {
        makeAutoObservable(this);
    }

    setYears(years:IYear[]){
        this.years = years;
    }

    
    setCallback(){
        this.callback = !this.callback
    }    

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async fetchYears(token:string,isAdmin:boolean) {
        this.setLoading(true)
        try {
            if(!isAdmin) return alert("You're not an admin")           
            const res = await Api.fetchYears(token)               
            this.setYears(res.data);               
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
        this.setLoading(false)
    }

         
     }

 
     
   
    



 
