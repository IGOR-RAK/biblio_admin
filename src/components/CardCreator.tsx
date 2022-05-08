import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ImageLoader from "./ImageLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardCreator() {
  const { cards, years, items, store } = React.useContext(Context);
 
  React.useEffect(() => {
    if (cards.message) {
      toast(cards.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [cards.callback]);

  React.useEffect(() => {
    if (years.message) {
      toast(years.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [years.callback]);

  React.useEffect(() => {
    if (items.message) {
      toast(items.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [items.callback]);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      cards.initState.public_id &&
      cards.initState.url &&
      cards.initState.author &&
      cards.initState.letter &&
      cards.initState.year &&
      cards.initState.item
    ) {
      cards.createCardItem(store.token, store.isAdmin);
    }
  };
  const btn_disabled =Boolean(cards.initState.author.length)&&Boolean(cards.initState.item.length)&&Boolean(cards.initState.year.length)
  console.log("cards.is",btn_disabled)
  return (
    <div className="creator">
      <div className="container">
        <ImageLoader />
        {cards.initState?.author ? (
          <div className="author mt-2">
            <div>Author:</div>
            <div><b>{cards.initState.author}</b></div>
          </div>
        ) : null}
        {cards.initState?.letter ? (
          <div className="letter mt-2">
            <div>Letter:</div>
            <div><b>{cards.initState.letter}</b></div>
          </div>
        ) : null}
        {cards.initState.year && (
          <div className="mt-2">Choosen year: <b>{cards.initState.year}</b></div>
        )}
        {cards.initState.item && (
          <div className="mt-2">Choosen item: <b>{cards.initState.item}</b></div>
        )}
        <div>
          <label>Note</label>
          <input
            className="form-control input"
            type="text"
            name="note"
            onChange={(e) => {
              cards.setNote(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Link</label>
          <input
           className="form-control input"
            type="text"
            name="link"
            onChange={(e) => {
              cards.setLink(e.target.value);
            }}
          />
        </div>

        <button
         className="btn btn-primary mt-2" 
         disabled={!btn_disabled}
         onClick={handleButtonClick}>Create Card</button>

        <ToastContainer />
      </div>
    </div>
  );
}

export default observer(CardCreator);
