import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ICard from "../models/ICard";
import { useNavigate } from "react-router-dom";
import IServerCard from "../models/IServerCard";

interface ICardItem {
  card: IServerCard;
}

const CardsItem: FC<ICardItem> = ({ card }) => {
  const { cards, store} = React.useContext(Context);
  let navigate = useNavigate();
  const handleEdit = (card: ICard) => {
    navigate(`/edit/${card._id}`);
  };
  const handleDelete = (card: ICard) => {  
    cards.deleteCard(store.token, store.isAdmin, card);
  };
  return (
    <div key={card._id} className="row mb-3">
      <div className="col-sm-6 ">
        <img className="img-thumbnail" src={card.url} alt={card.author} />
      </div>
      <div className="col-sm-6 ">
        <div>{card.author}</div>
        <div>{card.item}</div>
        <div>{card._id}</div>
        <div>{card.year}</div>
        {card.note && <div>{card.note}</div>}
        {card.link && (
          <div>
            <a href={card.link} target="_blank" rel="noreferrer">
              Link
            </a>
          </div>
        )}
        <div className="btn-group">
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleEdit(card);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(card);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(CardsItem);
