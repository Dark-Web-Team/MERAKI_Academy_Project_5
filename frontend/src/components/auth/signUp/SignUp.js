import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FormControl ,Button,Alert} from "react-bootstrap";
import "./signUp.css";
require("dotenv").config();

export default function SignUp() {
  const history = useHistory();
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [role_id, setRole_id] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const register = () => {
    if (!displayName) {
      setErrMessage("you must enter you name ");
      return;
    }
    if (!city) {
      setErrMessage("you must enter your city ");
      return;
    }

    if (password.length < 8) {
      setErrMessage("the password must be longer than 8  ");
      return;
    }
    if (age === 0) {
      setErrMessage("you must enter your age ");
      return;
    }

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
        setErrMessage(err.response.data.sqlMessage);
      });
  };

  return (
    <div className="container">
     

      <div className="sign-up-input">
        <FormControl
          placeholder="display Name"
          type="text"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
        <FormControl
          placeholder="your city"
          type="text"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <FormControl
          placeholder="your Email"
          type="text"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormControl
          placeholder="your Password"
          type="password"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
         <FormControl
          placeholder="your Age"
          type="number"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
            setAge(parseInt(e.target.value));
          }}
          
        />
        <select
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option>select a gender...</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <select
          onChange={(e) => {
            setRole_id(parseInt(e.target.value));
          }}
        >
          <option>you are user or owner ...</option>
          <option value={1}>user</option>
          <option value={3}>owner</option>
        </select>
        <div className="sign-up-button">
        <Button className="singUpButton" variant="outline-primary" onClick={register}>Sing Up</Button>{' '}
      </div>
      {errMessage ? <div className="errMessage"><Alert key={1} variant="danger">
    {errMessage}
  </Alert> </div> : ""}
      </div>
    </div>
  );
}

