import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [role_id, setRole_id] = useState(1);
  const register = () => {
    console.log({
      displayName,
      city,
      email,
      password,
      age,
      gender,
      role_id,
    });

    const url = process.env.REACT_APP_BACKEND_SERVER
    console.log(url);
    
    // axios.post("http://localhost:5000/users",{
    //     displayName,
    //     city,
    //     email,
    //     password,
    //     age,
    //     gender,
    //     role_id,
    //   }).then(result=>{
    //       console.log(result);
    //   }).catch(err=>{
    //       console.log(err.response.data);
    //   })
  };

  return (
    <div>
      <div className="sign-up-input">
        <input
          className="registerInput"
          type="text"
          placeholder="display Name"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="text"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="registerInput"
          type="number"
          placeholder="age"
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
      </div>
      <div className="sign-up-button">
        <button onClick={register}>Sing Up</button>
      </div>
    </div>
  );
}
