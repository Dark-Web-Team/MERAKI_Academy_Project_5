import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./profile.css";

export default function EditProfile() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [user_image, setUser_image] = useState("");
  const [role_id, setRole_id] = useState(0);
  const [Info, setInfo] = useState(false);

  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  if (state.token) {
    if (!Info) {
      setInfo(true);
    }
  }
  useEffect(() => {
    if (state.token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_SERVER}users`, {
          headers: {
            authorization: "Bearer " + state.token,
          },
        })
        .then((result) => {
          setUserInfo(result.data);
          setDisplayName(result.data[0].displayName);
          setCity(result.data[0].city);
          setEmail(result.data[0].email);
          setPassword(result.data[0].password);
          setAge(result.data[0].age);
          setGender(result.data[0].gender);
          setUser_image(result.data[0].user_image);
          setRole_id(result.data[0].role_id);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [Info]);

  const updateInfo = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_SERVER}users`,
        { displayName, city, email, age, gender,user_image, role_id },
        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        }
      )
      .then((result) => {
        history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="profile-information">
      {userInfo ? (
        <div className="your-information">
          <p className="login_text" style ={{fontFamily:'Arial, Helvetica, sans-serif'}}>Edit Your Info...</p> <br />
          <h3 className="email-edit-info">
          Email : {userInfo[0].email}
          </h3>
          <FormControl
            className="editForm"
            placeholder={`Your Name : ${userInfo[0].displayName}`}
            type="text"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
          <FormControl
            className="editForm"
            as="select"
            placeholder={`Your City : ${userInfo[0].city}`}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            <option value={userInfo[0].city}>
              Your City : {userInfo[0].city}
            </option>
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
          </FormControl>
          <FormControl
            className="editForm"
            placeholder={`Your Age : ${userInfo[0].age}`}
            type="number"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setAge(parseInt(e.target.value));
            }}
          />
          <FormControl
            className="editForm"
            as="select"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value={userInfo[0].gender}>
              Your gender : {userInfo[0].gender}
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </FormControl>
          <FormControl
            className="editForm"
            placeholder={`Your profile pic : ${userInfo[0].user_image}`}
            type="text"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            onChange={(e) => {
              setUser_image(e.target.value);
            }}
          />
          <div className="sign-up-button">
            <Button className="singUpButton" onClick={updateInfo}>
              Update Your Info
            </Button>{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
