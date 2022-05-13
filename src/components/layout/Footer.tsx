import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

function Footer() {
  const { store } = React.useContext(Context);

  return (
    <div className="footer">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            {!store.isAuth ? null : store.isAdmin ? (
              <div>Admin</div>
            ) : (
              <div>User</div>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <div>Created by Igor Rak</div>
            <div className="ms-5">
              <a
                href="https://github.com/IGOR-RAK/biblio_admin"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Footer);
