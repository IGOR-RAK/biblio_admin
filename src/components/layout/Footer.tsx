import React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

function Footer() {
  const { store } = React.useContext(Context);

  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <div>
            {!store.isAuth ? null : store.isAdmin ? (
              <div>Admin</div>
            ) : (
              <div>User</div>
            )}
          </div>
          <div>Created by Igor Rak</div>
        </div>
      </div>
    </div>
  );
}

export default observer(Footer);
