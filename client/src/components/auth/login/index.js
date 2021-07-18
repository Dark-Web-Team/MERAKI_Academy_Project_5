import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setToken } from "../../../reducers/login";
import jwt from "jsonwebtoken";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

import "./login.css";

require(`dotenv`).config();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const lastVisited = useSelector((state) => state.lastVisited.path);
  const [errMessage, setErrMessage] = useState("");
  const [errPresent, setErrPresent] = useState(false);
  const flection = () => {
    history.push("/signUp");
  };
  const handleLogin = () => {
    axios
      .post(`/login`, {
        email,
        password,
      })
      .then((result) => {
        const token = result.data.token;
        const tokenPayload = jwt.decode(token);
        dispatch(setToken(token, tokenPayload.user_id, tokenPayload.user_name));
        localStorage.setItem("token", result.data.token);

        history.push("/");
      })
      .catch((err) => {
        setErrPresent(true);
        setErrMessage(err.response.data);
        throw err;
      });
  };

  return (
    <>
      <div className="login">
        <div class="cont">
          <div class="form sign-in">
            <h2>Welcome back,</h2>
            <label>
              <span>Email</span>
              <input
                className="input-login"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                className="input-login"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <p class="forgot-pass">Forgot password?</p>
            <button
              type="button"
              className="submit-login"
              onClick={handleLogin}
            >
              Sign In
            </button>
            {errPresent && (
              <div className="errMessage">
                <br />{" "}
                <Alert
                  variant="danger"
                  style={{ width: "35vw", textAlign: "center" }}
                >
                  {errMessage}
                </Alert>
              </div>
            )}
            <div className="div-signInNow_text">
              <p className="signInNow_text">
                New here? <Link to="/signUp">Sign Up</Link>
              </p>
            </div>
          </div>
          <div class="sub-cont">
            <div class="img">
              <div class="img__text m--up">
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div class="img__text m--in">
                <h2>One of us?</h2>
                <p>
                  If you already has an account, just sign in. We've missed you!
                </p>
              </div>
              <div class="img__btn" onClick={flection}>
                <span class="m--up">Sign Up</span>
                <span class="m--in">Sign In</span>
              </div>
            </div>
            <div class="form sign-up">
              <h2>Time to feel like home,</h2>
              <label>
                <span>Name</span>
                <input type="text" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" />
              </label>
              <label></label>
              <button type="button" class="submit">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
