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

const Years: React.FC<IYears> = ({ handleModal }) => {
  const { years, store, cards } = React.useContext(Context);

  React.useEffect(() => {
    years.fetchYears(store.token, store.isAdmin);
  }, [years.callback]);

  const handleInput = (title: string, id: string) => {
    cards.setYear(title, id);
  };

  if (years.isEditYear) {
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
          <div></div>
          <form className="years">
            <div>
              {years.mapedYears?.map((year) => {
                if (year.isEdit === true) {
                  return (
                    <div
                      key={year._id}
                      className="d-flex justify-content-between mb-2 box"
                    >
                      <div className="input_box">
                        <input
                          className="form-control input"
                          type="text"
                          placeholder={year.title}
                          value={years.editInput}
                          onChange={(e) => {
                            years.setEditInput(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            years.editYear(
                              store.token,
                              store.isAdmin,
                              year._id,
                              year.isActive
                            );
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            years.setYearId("");
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
                    key={year._id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <div className="form-check mb-3">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="remember"
                          value={year.title}
                          onChange={() => handleInput(year.title, year._id)}
                        />{" "}
                        {year.title}+{year.isActive.toString()}
                      </label>
                    </div>
                    <div className="btn-group">
                      <button
                        className="btn btn-danger"
                        disabled={year.isActive}
                        onClick={(e) => {
                          e.preventDefault();
                          years.deleteYear(
                            store.token,
                            store.isAdmin,
                            year._id
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

export default observer(Years);
