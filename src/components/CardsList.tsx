import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import CardItem from "./CardItem";

function CardsList() {
  const { cards } = React.useContext(Context);

  return (
    <div>
      {cards?.cards.map((card) => (
        <CardItem key={card._id} card={card} />
      ))}
    </div>
  );
}

export default observer(CardsList);
