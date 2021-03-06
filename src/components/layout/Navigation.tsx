import React, { FC, useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import ItemCreator from "../ItemCreator";
import YearCreator from "../YearCreator";
import Years from "../Years";
import Items from "../Items";

const Navigation: FC = () => {
  const { store, ui } = useContext(Context);

  const [isItemModal, setIsItemModal] = React.useState(false);
  const [isYearModal, setIsYearModal] = React.useState(false);
  const [isYearsModal, setIsYearsModal] = React.useState(false);
  const [isItemsModal, setIsItemsModal] = React.useState(false);

  const handleSetIsItemModal = () => {
    setIsItemModal((actual) => !actual);
  };
  const handleSetIsYearModal = () => {
    setIsYearModal((actual) => !actual);
  };
  const handleSetIsItemsModal = () => {
    setIsItemsModal((actual) => !actual);
  };

  const handleSetIsYearsModal = () => {
    setIsYearsModal((actual) => !actual);
  };

  return (
    <div className="col-sm-2 ">
      <div className="navigation">
        <div className="navigation__box">
          <div>
            <Link to="/new">
              <button className="btn btn-primary">Create new card</button>
            </Link>{" "}
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSetIsItemModal}>
              Create new Item
            </button>
            {isItemModal && <ItemCreator handleModal={handleSetIsItemModal} />}
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSetIsYearModal}>
              Create new Year
            </button>
            {isYearModal && <YearCreator handleModal={handleSetIsYearModal} />}
          </div>
        </div>
        <div className="navigation__box">
          <div>
            <button
              className={`btn btn-primary ${ui.alarmItems && "alarm"}`}
              onClick={handleSetIsItemsModal}
            >
              Show Items
            </button>
            {isItemsModal && <Items handleModal={handleSetIsItemsModal} />}
          </div>
          <div>
            <button
              className={`btn btn-primary ${ui.alarmYears && "alarm"}`}
              onClick={handleSetIsYearsModal}
            >
              Show Years
            </button>
            {isYearsModal && <Years handleModal={handleSetIsYearsModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Navigation);
