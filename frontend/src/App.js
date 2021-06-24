import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import SignUp from "./components/auth/signUp/SignUp";
import Login from "./components/auth/login";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </div>
  );
};

export default App;
