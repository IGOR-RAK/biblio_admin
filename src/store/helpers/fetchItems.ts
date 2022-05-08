
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import { API } from '../../api/api';



interface IItems {
    _id:string;
    title:string;
}


export default class FetchItems{
      items:IItems[] = [] ;     
      isLoading = false; 
      callback=false;   

    constructor() {
        makeAutoObservable(this);
    }

    setItems(items:IItems[]){
        this.items = items;
    }

    
    setCallback(){
        this.callback = !this.callback
    }    

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async fetchItems(token:string,isAdmin:boolean) {
        try {
            if(!isAdmin) return alert("You're not an admin")
            this.setLoading(true)
            const res = await axios.get(`${API.PROD}/api/item`,{
                headers: {Authorization: token}
            });                                    
            this.setItems(res.data);   
            this.setLoading(false)
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
    }

         
     }

 
     
   
    



 
