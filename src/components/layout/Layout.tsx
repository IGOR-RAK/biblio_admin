import React, { FC, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import Navigation from "./Navigation";

const Layout: FC = () => {
  const { store } = useContext(Context);
  const isLoading = store.isLoading;
  return (
    <>
      {store.isAdmin ? (
        <>
          <Header />
          <main className="container mt-5">
            <div className="container-fluid">
              <div className="row">
                <Navigation />
                <div className="col-sm-10">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </>
      ) : (
        <main className="main">
          {isLoading ? (
            <div className="spinner-border text-primary"></div>
          ) : (
            <div>
              <Outlet />
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default observer(Layout);
