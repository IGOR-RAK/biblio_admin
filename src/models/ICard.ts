import {IImage} from "./IImage"


export  interface ICard{
    _id?: string;
    author:string;
    public_id:string;
    url:string;
    letter: string;    
    year:string;
    yearID?:string;   
    item:string;
    note?:string;
    link?:string;
}



