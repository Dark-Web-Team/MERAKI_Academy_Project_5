import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  FormControl,
  Button,
  Alert,
  FormGroup,
  FormLabel,
  Form,
} from "react-bootstrap";
import "./signUp.css";
require("dotenv").config();

export default function SignUp() {
  const history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPass, setConformPass] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [role_id, setRole_id] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [emailErr, setEmailErr] = useState("please enter an email");
  const [emailInValid, setEmailInValid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [validated, setValidated] = useState(false);

  const register = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();

    if (form.checkValidity()) {
      if (password === conformPass) {
        axios
          .post(process.env.REACT_APP_BACKEND_SERVER + "users", {
            displayName,
            city,
            email,
            password,
            age,
            gender,
            role_id,
          })
          .then((result) => {
            if (result.status === 201) {
              history.push("/login");
              return;
            }
          })
          .catch((err) => {
            if (err.response.status === 422) {
              setValidated(false);
              setEmailInValid(true);
              setEmailErr("Email doesn't exist");
              return;
            }
            setErrMessage(err.response.data.sqlMessage);
          });
      } else {
        setErrMessage("Those passwords didn’t match. Try again.");
        setPasswordInvalid(true);
      }
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-ch1">
          <Form
            className="input-sign-up-container"
            noValidate
            validated={validated}
            onSubmit={register}
          >
            <Form.Group>
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your display name"
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your display name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select your usage</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setRole_id(parseInt(e.target.value));
                }}
                required
              >
                <option>Select your usage...</option>
                <option value={1}>user</option>
                <option value={3}>owner</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select your account usage.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                isInvalid={emailInValid}
              />
              <Form.Control.Feedback type="invalid">
                {emailErr}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Conform Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password again"
                onChange={(e) => {
                  setConformPass(e.target.value);
                }}
                required
                isInvalid={passwordInvalid}
              />
              <Form.Control.Feedback type="invalid">
                Those passwords didn’t match. Try again.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select City</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              >
                <option value="amman">Amman</option>
                <option value="zarqa">Zarqa</option>
                <option value="irbid">Irbid</option>
                <option value="salt">Salt</option>
                <option value="karak">Karak</option>
                <option value="jarash">Jarash</option>
                <option value="ajloun">Ajloun</option>
                <option value="mafraq">Mafraq</option>
                <option value="ma'an">Ma'an</option>
                <option value="tafeleih">Tafeleih</option>
                <option value="madaba">Madaba</option>
                <option value="aqaba">Aqaba</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please choose a city.
              </Form.Control.Feedback>
            </Form.Group>
            <button className="singUpButton" type="submit">
              Sing Up
            </button>
          </Form>
          {errMessage ? (
            <div className="errMessage">
              <Alert key={1} variant="danger">
                {errMessage}
              </Alert>{" "}
            </div>
          ) : (
            ""
          )}
          <p className="signUp_text">
            Already have an account ? <Link to="/login">Sign in</Link>
          </p>
        </div>
        <div className="sign-up-ch2"></div>
      </div>
    </>
  );
}
