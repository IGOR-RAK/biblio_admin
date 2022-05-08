import IItems from "../models/IItems";
import {makeAutoObservable} from "mobx";
import axios from 'axios';
import { API } from './../api/api';




interface IIsEdit {
    _id:string;
    title:string;
    isEdit:boolean
}

export default class itemsStore{
     

      items:IItems[] = [] ; 
      item:string = '';
      isLoading = false; 
      callback=false;
      isEdit=false;
     

      itemId:string = ''; 
      editInput:string = ''; 
      
      isNewLoading = false; 
      newItem:string = '';     

      isEditItem = false; 
      newItemError= ""
     
       message='';


    constructor() {
        makeAutoObservable(this);
    }

    setItems(items:IItems[]){
        this.items = items;
    }

    setItem(item:string){
        this.item = item;
    }

    setNewItem(item:string){
        this.newItem = item;
    }


    setCallback(){
        this.callback = !this.callback
    }    

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setIsNewItemLoading(bool: boolean) {
        this.isNewLoading = bool;
    }

    // setNewYear(year:string){
    //     this.newYear = year;
    // }   

    setNewItemLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setItemId(id:string){
        this.itemId = id
    }

    setEditInput(value:string){
        this. editInput = value
    }

    setMessage(value:string){
        this.message = value
    }

    setNewError(value:string){
        this.newItemError = value
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

    async createItem(token:string,isAdmin:boolean) {
        try {
            await this.fetchItems(token,isAdmin)
            if(!isAdmin) return alert("You're not an admin")          
            const find = this.items.find(item=>item.title === this.newItem)
            console.log("find",find)
            if(find) {
                this.setNewError("Ten deskryptor już istnieje.")
            }
            
            if(this.newItem&&!find){
                this.setIsNewItemLoading(true)
                const res=await axios.post(`${API.PROD}/api/item`, {title:this.newItem}, {
                    headers: {Authorization: token}
                })             
                this.setNewItem("");
                this.callback = !this.callback;
                this.setIsNewItemLoading(false);               
            }
                   
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message;  
          else message = String(error)        
          alert(message)
         
        } finally {
            // document.location.reload()
        }
    }

    async deleteItem(token:string,isAdmin:boolean,id:string) {
        try {
            if(!isAdmin) return alert("You're not an admin");          
                this.setNewItemLoading(true)
                const res=await axios.delete(`${API.PROD}/api/item/${id}`,  {
                    headers: {Authorization: token}
                })
                this.setMessage(res.data.msg); 
                this.newItem="";
                this.callback = !this.callback
                this.setNewItemLoading(false);                
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        }
    }

    async editItem(token:string,isAdmin:boolean,id:string,fn: () => void) {
        try {
            if(!isAdmin) return alert("You're not an admin");          
                this.isEditItem = true
                const res=await axios.put(`${API.PROD}/api/item/${id}`, {title:this.editInput}, {
                    headers: {Authorization: token}
                }); 
                this.setMessage(res.data.msg); 
                this.setItemId("")
                this.callback = !this.callback;
                this.isEditItem = false;
                       
        } catch (error) {
          let message
          if (error instanceof Error) message = error.message
          else message = String(error)        
          alert(message)
        } finally{
            document.location.reload()
        }
    }

    
     get mapedItems(){
         if (this.items.length >0) {
            const arr: IIsEdit[]= [...this.items].map(el=> {
                if(el._id === this.itemId) {
                    this.editInput = el.title;
                     return {...el,isEdit:true}}
                return {...el,isEdit:false}});
                return arr
         }         
     }

 
     
   
    }



 
