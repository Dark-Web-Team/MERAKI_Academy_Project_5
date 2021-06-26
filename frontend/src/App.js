import React from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home"
import SignUp from "./components/auth/signUp/SignUp";
import Login from "./components/auth/login";
import Category from "./components/category/index"
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Route exact path ="/" component = {Home}/>
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/category/:type" component={Category} />

    </div>
  );
};

export default App;
