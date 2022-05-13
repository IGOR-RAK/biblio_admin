import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Link } from "react-router-dom";

function Header() {
  const { store } = React.useContext(Context);

  return (
    <div className="header">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="text-white-50" >
            <Link  to="/">Start Page</Link>
          </div>
          <div className="d-flex justify-content-between">           
            {store.isAuth ? (
              <div className="ms-5 cursor">
                <a
                  className="text-white-50 "
                  onClick={() => {
                    store.logout();
                  }}
                >
                  Log Out
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Header);
