import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Modal from "../components/UI/modal/Modal";

interface Event<T = EventTarget> {
  target: T;
}
type IItemCreator = {
  handleModal(): void;
};
interface IItemError {
  //   created:string,
  //   between:string
}

const ItemCreator: React.FC<IItemCreator> = ({ handleModal }) => {
  const { items, store } = React.useContext(Context);
  const [error, setError] = React.useState<IItemError>({} as IItemError);

  const errorHandler = () => {
    //   const alreadyCreated = years.years.find(year => year.title === years.newYear);
    //   const find = years.allowedYears.find(year => year === years.newYear);
    //   if (years?.newYear.length === 4 && alreadyCreated){
    //     setError({...error,created:`This year has already been created `})
    //   } else if(
    //     years?.newYear.length === 4 && !find
    //   ) {
    //     setError({...error,between:`Year value must be between ${years.start} and ${years.finish}`});
    //   } else {
    //     setError({...error,created:``,between:``});
    //   }
  };

  const handleInput = (e: Event<HTMLInputElement>) => {
    items.setNewItem(e.target.value);
    errorHandler();
    items.setNewError("");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    items.createItem(store.token, store.isAdmin);
  };
  if (items.isNewLoading) {
    return (
      <div className="container">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <Modal handleModal={handleModal}>
      <div className="item_creator">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="...dyskryptor"
            value={items.newItem}
            onChange={handleInput}
          />
          <label className="label" htmlFor="floatingInput">
            Nowy dyskryptor
          </label>
        </div>

        <div style={{ color: "red" }}>
          {items.newItemError && (
            <div className="mb-2" style={{ color: "red" }}>
              {items.newItemError}
            </div>
          )}
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Create new Item
        </button>
      </div>
    </Modal>
  );
};

export default observer(ItemCreator);
