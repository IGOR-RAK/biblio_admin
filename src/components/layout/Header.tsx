import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Link } from "react-router-dom";

function Header() {
  const { store } = React.useContext(Context);

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <button className="header__btn text-white-50">
            <Link to="/">Biblio Admin</Link>
          </button>
          <div className="header__info">
            {!store.isAuth ? null : store.isAdmin ? (
              <div>Admin</div>
            ) : (
              <div>User</div>
            )}
            {store.isAuth ? (
              <button
                className="header__btn text-white-50"
                onClick={() => {
                  store.logout();
                }}
              >
                Log Out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Header);
