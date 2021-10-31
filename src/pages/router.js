import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";
import Login from "./login";
import Signup from "./signup";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CssBaseline />
          <Header />
          <Body />
          <Footer />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
