import React, { Fragment, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

//redux stuff need provider
import { Provider } from "react-redux";
import store from "./store"; //index.js so dont have to include in path

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

// will only run once in loadUser reducer, so we put it here so it runs ever time the page refreshes
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //when state updates useEffect will continue looping unless we give it a second parameter []. empty brackets makes it like componentdidmount
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
