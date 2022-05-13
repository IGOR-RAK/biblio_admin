import React, { FC, useContext, useEffect } from "react";
import LoginForm from "./pages/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Cards from "./components/Cards";
import CardCreator from "./pages/CardCreator";
import EditCard from "./pages/EditCard";
import Years from "./pages/Years";

const App: FC = () => {
  const { store } = useContext(Context);
  const token = store.token;

  useEffect(() => {
    const firstLogin = localStorage.getItem("refresh_token");
    if (firstLogin) {
      store.refreshToken();
    }
  }, []);

  useEffect(() => {
    if (token) {
      store.getUser(token);
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={store.isAuth ? <Years /> : <LoginForm />} />
          <Route
            path="/cards/:year"
            element={store.isAuth ? <Cards /> : <LoginForm />}
          />
          <Route
            path="/new"
            element={store.isAuth ? <CardCreator /> : <LoginForm />}
          />
          <Route
            path="/edit/:id"
            element={store.isAuth ? <EditCard /> : <LoginForm />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default observer(App);
