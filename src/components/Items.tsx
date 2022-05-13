import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Modal from "../components/UI/modal/Modal";

interface Event<T = EventTarget> {
  target: T;
}

type IYears = {
  handleModal(): void;
};

const Items: React.FC<IYears> = ({ handleModal }) => {
  const { items, store, cards } = React.useContext(Context);

  React.useEffect(() => {
    items.fetchItems(store.token, store.isAdmin);
    cards.fetchCards();
  }, [items.callback]);

  const handleInput = (e: Event<HTMLInputElement>) => {
    cards.setItem(e.target.value);
  };

  if (items.isLoading) {
    return (
      <Modal handleModal={handleModal}>
        <div className="container">
          <div className="spinner-border text-primary"></div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal handleModal={handleModal}>
      <div className="years">
        <div className="container">
          <form className="years">
            <div>
              {items.mapedItems?.map((item) => {
                const find = cards.cards.find(
                  (card) => card.item === item.title
                );
                const active = Boolean(find);
                if (item.isEdit === true) {
                  return (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between mb-2 box"
                    >
                      <div className="input_box">
                        <input
                          className="form-control input"
                          type="text"
                          placeholder={item.title}
                          value={items.editInput}
                          onChange={(e) => {
                            items.setEditInput(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            items.editItem(
                              store.token,
                              store.isAdmin,
                              item._id,
                              cards.setCallback
                            );
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            items.setItemId("");
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <div className="form-check mb-3">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="remember"
                          value={item.title}
                          onChange={handleInput}
                        />{" "}
                        {item.title}
                      </label>
                    </div>
                    <div className="btn-group">
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          items.setItemId(item._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        disabled={active}
                        onClick={(e) => {
                          e.preventDefault();
                          items.deleteItem(
                            store.token,
                            store.isAdmin,
                            item._id
                          );
                          cards.setYear("", "");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default observer(Items);
