import React from 'react'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import IItems from "../models/IItems"

const Items: React.FC  = () => {
    const {store,edit,cards} = React.useContext(Context);

      
    React.useEffect(()=>{
    edit.items.fetchItems(store.token,store.isAdmin)
    },[edit.callback])
    const handleInput = (item:IItems)=>{
      edit.setItem(item.title)
    }

   

    if(edit.items.isLoading) {
      return (
        
          <div className="items">
            <div>...Laduę</div>
          </div>
      
          )
    }
 
    return (
      
        <div className="my_years">
           <div className="my_years_body">
        {edit.items.items&&edit.items.items.map(item=> (
          <div className="my_years_item" key={item._id}>
            <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="remember"
                        value={item.title}
                        onChange={()=>handleInput(item)}
                      />{" "}
                      {item.title}
                    </label>       
          </div>
        )
        )}   
        </div>   
        </div>
    
    )
}

export default observer(Items)