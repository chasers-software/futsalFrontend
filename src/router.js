import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages

import Header from "./components/Header";
import Body from "./screens/HomeScreen";
import Footer from "./components/Footer";
import { CssBaseline } from "@mui/material";
import Login from "./screens/login";
import Signup from "./screens/signup";
import MatchesScreen from "./screens/MatchesScreen";
import FutsalDetail from "./components/FutsalDetail";

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
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/matches" component={MatchesScreen} />
        <Route path="/futsalDetail/" component={FutsalDetail}></Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
