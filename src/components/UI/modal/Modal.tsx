import React from 'react'
import {observer} from "mobx-react-lite";
import styles from "./Modal.module.scss"

type IModal = {
    handleModal() : void,
  };
  
const Modal: React.FC<IModal> = ({children,handleModal}) =>{
    
    return (
        <div className={styles.modal}>     
            <div className={styles.modal__content}>
                {children}
            </div>          
            <div className={styles.modal_close} >
                <div><button className='btn btn-outline-danger' onClick={handleModal}>Close</button></div>
            </div>                      
        </div>
    )}


export default observer(Modal)