import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import Logout from "./Logout";

function App(props) {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/activate/:token" component={Home} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
