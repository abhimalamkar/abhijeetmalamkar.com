import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import decode from "jwt-decode";

import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";

import "./style/stylesheet.css";

import App from "./App";

import { userLoggedIn } from "./redux/actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { store } from './redux/store';

if (localStorage.appJWT) {
  const payload = decode(localStorage.appJWT);
  const user = {
    token: localStorage.appJWT,
    email: payload.email,
    confirmed: payload.confirmed,
    profile_pic: payload.profile_pic,
    name: payload.name
  };

  setAuthorizationHeader(localStorage.appJWT)
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
