import React,{useEffect} from "react";
import { Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/home"
import SignUp from "./components/auth/signUp/SignUp";
import Login from "./components/auth/login";
import Category from "./components/category/index"
import Profile from "./components/profile"
import EditProfile from "./components/profile/EditProfile"
import Busnisses from "./components/busnisses/index"
import AddBusiness from "./components/add_business";
import { useDispatch } from "react-redux";
import { setToken,setUser_id } from "./reducers/login";
import jwt from "jsonwebtoken"
import 'bootstrap/dist/css/bootstrap.min.css';
require("dotenv").config();



const App = () => {
  const dispatch = useDispatch();
  useEffect(async() => {
    dispatch(setToken(localStorage.getItem("token")))
    const token1= localStorage.getItem("token").split(' ').pop();
    try{
    const tokenPayload = await jwt.decode(token1);
    dispatch(setUser_id(tokenPayload.user_id))
    } catch(err){
        console.log(err);
        throw err
    }

  }, [])
  return (
    <div className="App">
      <Navigation />
      <Route exact path ="/" component = {Home}/>
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/edit-profile" component={EditProfile} />
      <Route exact path="/category/:type" component={Category} />
      <Route exact path="/business/:id" component={Busnisses} />
      <Route exact path="/profile/:id/addBusiness" component={AddBusiness}/>
    </div>
  );
};

export default App;
