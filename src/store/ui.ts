
import {makeAutoObservable} from "mobx";

export default class UI{
      alarmItems=false;
      alarmYears=false;  

    constructor() {
        makeAutoObservable(this);
    }

    setAlarmItems(bool:boolean){
        this.alarmItems = bool;
    }

    setAlarmYears(bool:boolean){
        this.alarmYears = bool;
    }
 
    }

 
     
   
    



 
