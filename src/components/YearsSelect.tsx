import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {IYear} from "../models";

const YearSelect: React.FC = () => {
  const { store, edit } = React.useContext(Context);

  React.useEffect(() => {
    edit.years.fetchYears(store.token, store.isAdmin);
  }, [edit.callback]);
  const handleInput = (year: IYear) => {
    edit.setYear(year.title);
  };

  if (edit.years.isLoading) {
    return (
      <div className="years">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="my_years">
      <div className="my_years_body">
        {edit.years.years &&
          edit.activeYears.map((year) => (
            <div className="my_years_item" key={year._id}>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="remember"
                  value={year.title}
                  onChange={() => handleInput(year)}
                />{" "}
                {year.title}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default observer(YearSelect);
