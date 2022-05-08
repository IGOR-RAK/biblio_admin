import React from 'react'
import {observer} from "mobx-react-lite";
import {  useParams } from 'react-router-dom';
import {Context} from "../index";
import CardsList from './CardsList';


function Cards() {
    const {cards} = React.useContext(Context);
    let { year } = useParams();
    
    React.useEffect(()=>{
      if(year){
        if(year==="all"){cards.fetchCards()}
        else { cards.fetchCardsByYear(year)}
       
      }
     
    },[cards.callback])


    

    if(cards.isLoading) {
      return (
        <div className="container mt-5">
          <div className="spinner-border text-primary"></div>
        </div>
          )
    }
   
    return (    
            <CardsList />  
    )
}

export default observer(Cards)
