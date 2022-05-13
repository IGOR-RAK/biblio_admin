import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Link } from "react-router-dom";

const Years: React.FC = () => {
  const { years, store} = React.useContext(Context);

  React.useEffect(() => {
    years.fetchYears(store.token, store.isAdmin);
  }, [years.callback]);



  if (years.isLoading) {
    return (
      <div className="container">
        <div>
          <div className="spinner-border text-primary"></div>
        </div>
      </div>
    );
  }
  
  const activeYears = years.years.filter(year=>year.isActive)
  const nonActiveYears = years.years.filter(year=>!year.isActive)


  return (
    <div className="container">
      <div>
        <div>
        <Link to={`/cards/all`}>
                <button className="btn btn-link">ALL</button>
              </Link>
        </div>
        {activeYears.map((year) => {
          return (
            <div key={year._id}>
              <Link to={`/cards/${year.title}`}>
                <button className="btn btn-link">{year.title}</button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="m-2 mt-5">
      <div>Non-active years:</div>
      {nonActiveYears.map((year) => {
          return (
            <div className="mt-2"  key={year._id}>
              {year.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default observer(Years);
