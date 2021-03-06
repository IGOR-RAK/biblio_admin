import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./store/users";
import cardsStore from "./store/cards";
import yearsStore from "./store/years";
import itemsStore from "./store/items";
import editCard from "./store/editor";
import UI from "./store/ui"
import {
    BrowserRouter as Router 
  } from "react-router-dom";
  import './styles/index.scss';



interface State {
    store: Store,
    cards: cardsStore,
    years: yearsStore,
    items: itemsStore,
    edit:editCard,
    ui:UI
}

export const store = new Store();
export const cards = new cardsStore();
export const years = new yearsStore();
export const items = new itemsStore();
export const edit = new editCard();
export const ui = new UI();

export const Context = createContext<State>({
    store,cards,years,items,edit,ui
})

ReactDOM.render(
    <Context.Provider value={{store,cards,years,items,edit,ui}}>
        <Router>
            <App />
        </Router>
    </Context.Provider>,
  document.getElementById('root')
);