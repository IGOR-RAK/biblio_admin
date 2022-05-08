import { API,ROUTES,KEYS } from '../api/api';
import ICard from "../models/ICard";
import IServerCard from "../models/IServerCard";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import IYear from "../models/IYears";


interface Event<T = EventTarget> {
    target: T;   
  }

 

export default class cardsStore{
      cards = [] as IServerCard[];
      isLoading = false;
      isImageLoading = false;
      initState:ICard={      
        author:"",
        public_id:"",
        url:"",
        letter: "",   
        year:"",
        yearID:"",  
        item:"",
        note:"",
        link:"",
      }
      callback=false;
      message='';


    constructor() {
        makeAutoObservable(this);
    }

    setNote(note:string){
        this.initState.note = note;
    }

    setLink(link:string){
        this.initState.link = link;
    }

    setAthor(author:string){
        this.initState.author = author.charAt(0).toUpperCase()+author.slice(1);
    }

    setLetter(author:string){
        this.initState.letter = author.charAt(0).toLocaleLowerCase();
    }

    setCards(cards:IServerCard[]) {
        this.cards = cards;
    }

    setYear(year:string,id:string) {
        this.initState.year=year;
        this.initState.yearID=id;
    }

    setItem(item:string){
        this.initState.item=item
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setCallback(){
        this.callback = !this.callback
    }  

    setMessage(value:string){
        this.message = value
    }

    async fetchCards() {
        try {
            this.setLoading(true)
            const res = await axios.get(`https://salty-springs-71498.herokuapp.com/api/card`, {
              
            });                                    
            this.setCards(res.data);   
            this.setLoading(false)
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
    }
    
    async fetchCardsByYear(yearId:string) {
        try {
            this.setLoading(true)
            const res = await axios.get(`https://salty-springs-71498.herokuapp.com/api/card/${yearId}`, {
              
            });                                    
            this.setCards(res.data);   
            this.setLoading(false)
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
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
                console.log("image",res.data)
                this.initState.public_id=res.data.public_id;
                this.initState.url=res.data.url;
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
            await axios.post(`${API.PROD}/api/destroy`, {public_id: this.initState.public_id}, {
                headers: {Authorization: token}
            })
            this.isImageLoading=false;
            this.initState.public_id="";
            this.initState.url="";
            this.setAthor("");
            this.setLetter("");  
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)        
            alert(message)
        }
    }


    async createCardItem(token:string,isAdmin:boolean) {
        try {
            if(!isAdmin) return alert("You're not an admin")          
            // const find = this.items.find(item=>item.title === this.newItem)
            // console.log("find",find)
            
            if(
                // this.newItem&&!find
                true
                ){
                this.setLoading(true)
                const res=await axios.post(`${API.PROD}/api/card`, {
                    author:this.initState.author,
                    public_id:this.initState.public_id,
                    url:this.initState.url,
                    letter:this.initState.letter,
                    note:this.initState.note,
                    item:this.initState.item,
                    year:this.initState.year,
                    link:this.initState.link
                }, {
                    headers: {Authorization: token}
                })
                const effect=await axios.put(`${API.PROD}/api/year/${this.initState.yearID}`, {title:this.initState.year,isActive:"true"}, {
                    headers: {Authorization: token}
                }); 

                this.setMessage(res.data.msg);             
                this.callback = !this.callback;
                this.initState={...this.initState,      
                    author:"",
                    public_id:"",
                    url:"",
                    letter: "",   
                    // year:"",  
                    // item:"",
                     note:"",
                     link:"",
                  }

                this.setLoading(false);               
            }
                   
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message;  
          else message = String(error)        
          alert(message)
         
        }
    }

    async deleteCard(token:string,isAdmin:boolean,card:ICard) {
        try {
            if(!isAdmin) return alert("You're not an admin");          
                this.setLoading(true)

                const cards = await axios.get(`${API.PROD}/api/card/${card.year}`, {              
                }); 
                const yearsRespond = await axios.get(`${API.PROD}/api/year`,{
                    headers: {Authorization: token}
                });
                const years:IYear[] = yearsRespond.data;
                const find = years.find(year=>year.title===card.year)

                if(cards.data.length === 1) {
                    const yearsRespond = await axios.get(`${API.PROD}/api/year`,{
                        headers: {Authorization: token}
                    });
                    const years:IYear[] = yearsRespond.data;
                    const find = years.find(year=>year.title===card.year)
                    const effect=await axios.put(`${API.PROD}/api/year/${find?._id}`, {title:card.year,isActive:"false"}, {
                        headers: {Authorization: token}
                    }); 
                }
               
                const res=await axios.delete(`${API.PROD}/api/card/${card._id}`,  {
                    headers: {Authorization: token}
                })
                this.setMessage(res.data.msg);               
                this.callback = !this.callback
                this.setLoading(false);                
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
    }

    }



 
