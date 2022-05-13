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

const SelectYear: React.FC<IYears> = ({ handleModal }) => {
  const { years, store, cards } = React.useContext(Context);

  React.useEffect(() => {
    years.fetchYears(store.token, store.isAdmin);
  }, [years.callback]);

  if (years.isEditYear) {
    return (
      <Modal handleModal={handleModal}>
        <div className="container">
          <div>...Laduę</div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal handleModal={handleModal}>
      <div className="years">
        <div className="container">
          <div></div>
          <form className="years">
            <div>
              {years.mapedYears?.map((year) => {
                return (
                  <div key={year._id}>
                    <input
                      type="text"
                      placeholder={year.title}
                      value={years.editInput}
                      onChange={(e) => {
                        years.setEditInput(e.target.value);
                      }}
                    />
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

export default observer(SelectYear);
