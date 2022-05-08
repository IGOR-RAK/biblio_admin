import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ImageLoader from "../components/ImageLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardCreator() {
  const { cards, store, ui } = React.useContext(Context);
  const [isAlarm, setIsAlarm] = React.useState(false);

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

  // React.useEffect(() => {
  //   if (years.message) {
  //     toast(years.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // }, [years.callback]);

  // React.useEffect(() => {
  //   if (items.message) {
  //     toast(items.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // }, [items.callback]);

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
  const btn_disabled =
    Boolean(cards.initState.author.length) &&
    Boolean(cards.initState.item.length) &&
    Boolean(cards.initState.year.length);
 
  return (
    <div className="container">
      <ImageLoader />

      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 ps-0  bd-highlight">Author:</div>
        <div className={`p-2 bd-highlight cursor ${isAlarm && "alarm"}`}>
          <b>
            {cards.initState.author
              ? cards.initState.author
              : "Please upload image"}
          </b>
        </div>
      </div>

      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 ps-0  bd-highlight">Letter:</div>
        <div className={`p-2 bd-highlight cursor ${isAlarm && "alarm"}`}>
          <b>
            {cards.initState.letter
              ? cards.initState.letter
              : "Please upload image"}
          </b>
        </div>
      </div>

      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 ps-0  bd-highlight">Choosen item</div>
        <div
          className="p-2 bd-highlight cursor"
          onMouseEnter={() => {
            ui.setAlarmItems(true);
          }}
          onMouseLeave={() => {
            ui.setAlarmItems(false);
          }}
        >
          <b>
            {cards.initState.item
              ? cards.initState.item
              : "Please select an item"}
          </b>
        </div>
      </div>

      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 ps-0 bd-highlight">Choosen year</div>
        <div
          className="p-2 bd-highlight cursor"
          onMouseEnter={() => {
            ui.setAlarmYears(true);
          }}
          onMouseLeave={() => {
            ui.setAlarmYears(false);
          }}
        >
          <b>
            {cards.initState.year
              ? cards.initState.year
              : "Please select an year"}
          </b>
        </div>
      </div>

    
      <div className="mb-2">
        <label>Note</label>
        <textarea
          className="form-control input"         
          name="note"
          value={cards.initState.note}
          onChange={(e) => {
            cards.setNote(e.target.value);
          }}
        />
      </div>
      <div className="mb-2">
        <label>Link</label>
        <input
          className="form-control input"
          value={cards.initState.link}
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
        onClick={handleButtonClick}
      >
        Create Card
      </button>

      <ToastContainer />
    </div>
  );
}

export default observer(CardCreator);
