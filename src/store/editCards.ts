import ICard from "../models/ICard";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import FetchItems from "./helpers/fetchItems";
import FetchYears from "./helpers/fetchYears";
import { API } from '../api/api';

interface Event<T = EventTarget> {
    target: T;   
  }


  interface IItems {
    _id:string;
    title:string;
}
 

export default class editCard{
      
      isLoading = false;
      itemsID = "";
      items = new FetchItems()
      years = new FetchYears()
      
    
      state:ICard={ 
     
      } as ICard;

      
      callback=false;

      isImageLoading = false;

      message = "";

      setState(card:ICard){
          this.state = card
      }

    setLoading(bool:boolean){
        this.isLoading = bool
    }
  
     

    setAthor(author:string){
        this.state.author = author.charAt(0).toUpperCase()+author.substring(1).toLowerCase();
        this.state.letter = author.charAt(0).toLowerCase()
    }

    setLetter(author:string){
        this.state.letter = author.charAt(0).toLocaleLowerCase();
    }

    setMessage(value:string){
        this.message = value
    }

    setItem(item:string){
        this.state.item = item;
    }

    setYear(year:string){
        this.state.year = year;
    }

    setNote(note:string){
        this.state.note = note;
    }

    setLink(link:string){
        this.state.link= link;
    }


    constructor() {
        makeAutoObservable(this);
    }


  

    async handleUpload (e: Event<HTMLInputElement>, isAdmin:boolean, token:string){ 
        try {
             if(!isAdmin) return alert("You're not an admin")
             const file = e.target.files;
             
        if(!file) {
            alert("File not exist.")
        }else{
            if(file[0].size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file[0].type !== 'image/jpeg' && file[0].type !== 'image/png') // 1mb
                return alert("File format is incorrect.")
                let formData = new FormData()
                formData.append('file', file[0])

                this.isImageLoading=true;
                const res = await axios.post(`${API.PROD}/api/upload`, formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                })                
              
                this.state.public_id=res.data.public_id;
                this.state.url=res.data.url;
                const file_name = file[0].name.split("_"); 
                this.setAthor(file_name[0]);
                this.setLetter(file_name[0]);  
                this.isImageLoading=false;
        }
            
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)        
            alert(message)
        }
    }
    

    async handleDestroy ( isAdmin:boolean, token:string){ 
        try {
        if(!isAdmin) return alert("You're not an admin")
        this.isImageLoading=true;
        await axios.post(`${API.PROD}/api/destroy`, {public_id: this.state.public_id}, {
            headers: {Authorization: token}
        })
        this.isImageLoading=false;
        this.state.public_id="";
        this.state.url="";
        this.setAthor("");
        this.setLetter("");  
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)        
        alert(message)
    }
}


async onEditCard(token:string,isAdmin:boolean,callback:boolean) {
    try {
        if(!isAdmin) return alert("You're not an admin");          
            this.isLoading = true
            const res=await axios.put(`${API.PROD}/api/card/${this.state._id}`, {
                author:this.state.author,
                public_id:this.state.public_id,
                url:this.state.url,
                letter:this.state.letter,
                note:this.state.note,
                item:this.state.item,
                year:this.state.year,
                link:this.state.link
            }, {
                headers: {Authorization: token}
            }); 
             this.setMessage(res.data.msg);         
            callback = !callback;
            this.isLoading = false            
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)        
      alert(message)
    }
}


  get activeYears(){
      return this.years.years.filter(year=>year.isActive)
  }




    }



 
