import React from 'react'
import {observer} from "mobx-react-lite";
import {Context, items} from "../index";
import ImageLoader from "./ImageLoader";
import Years from './Years';
import YearCreator from './YearCreator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Items from './Items';
import ItemCreator from './ItemCreator';
import {  useParams } from "react-router-dom";
import no_image from "../images/NO_IMAGE.jpg";
import { useNavigate } from "react-router-dom";
import ItemsSelect from './ItemsSelect';
import YearsSelect from './YearsSelect';
import axios from 'axios';
import ICard from '../models/ICard';
interface Event<T = EventTarget> {
    target: T;   
  }

function EditCard() {
    const {cards,store,edit} = React.useContext(Context);
      
        const[isYears,setIsYears] = React.useState(false);
        const[isItems,setIsItems] = React.useState(false);
      


        let params = useParams();
        let navigate = useNavigate();

     

        React.useEffect(()=>{
            async function fetch(){
                edit.setLoading(true)
                const res = await axios.get('/api/card', {
                });
                const fetchedCards:ICard[]= res.data
                const find = fetchedCards.find(card=>card._id === params.id);
                if(find) {edit.setState({...find,_id:params.id})}     
                edit.setLoading(false)
            }
             fetch()
        
            
        },[])

        
        React.useEffect(
            ()=>{
               if(edit.message){
                toast(edit.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
               }
              
           
            },
            [cards.callback]
        )

        const handleItemClick = () => {
            edit.onEditCard(store.token,store.isAdmin,cards.callback);
            // navigate("/")

        }

        const onUpload = (e: Event<HTMLInputElement>) => {
            edit.handleUpload(e,store.isAdmin,store.token)
        }

        const onDestroyClick = () => {
            edit.handleDestroy(store.isAdmin,store.token)
        } 
    
 

    if(edit.isLoading) {
        return (
          <div className="container mt-5">
            <div className="spinner-border text-primary"></div>
          </div>
            )
      }
     
    return (
        <div className="container">
            <div> {params.id}</div>
            <div>{edit.state.author}</div>
            <input type="text" value={edit.state.author} className="form-control"  onChange={(e)=>{edit.setAthor(e.target.value)}}/>
            <div>{edit.state.letter}</div>
            <div>
                <div>{edit.state.year}</div>
                <div>
                    <button className='btn btn-primary'  onClick={()=>{setIsYears(actual=>!actual)}}>{isYears?"Hide Years":"Show Years"}</button>
                    {isYears&&<YearsSelect/>}
                </div>
            </div>
            <div>
                <div>{edit.state.item}</div>
                <button className='btn btn-primary' onClick={()=>{setIsItems(actual=>!actual)}}>{isItems?"Hide Items":"Show Items"}</button>
                {isItems&&<ItemsSelect/>}
            </div>
           
           
            <div>
            <div>Image:</div>
                <div>{edit.state.public_id}</div>
                <div>{edit.state.url}</div>                
            </div>          
           
          

            <div className="img_loader">
                <input type="file" className="form-control" name="file" id="file_up" onChange={onUpload}/>
                {
                        edit.isImageLoading ? <div className="spinner-border text-primary"></div>
                        :<div className="file_img">
                            <img className="img"  src={edit.state.url ? edit.state.url : no_image} alt="#"/> 
                            {edit.state.url?<span className="cross" onClick={onDestroyClick}>&#10060;</span>:null}                          
                        </div>
                    }                
            </div> 

            <div>
                <textarea className='form-control' value={edit.state.note} onChange={(e)=>{edit.setNote(e.target.value)}}/>
            </div>
            <div>
                <input className='form-control' value={edit.state.link} onChange={(e)=>{edit.setLink(e.target.value)}}/>
            </div>

            <button className='btn btn-primary' onClick={handleItemClick} >Save Changes</button>        
        </div>
    )
            }

export default observer(EditCard)