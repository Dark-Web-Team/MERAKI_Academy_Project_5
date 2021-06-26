import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";

export default function Profile() {
  const [userInfo, setUserInfo] = useState("");
  let thisToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}users`, {
        headers: {
          authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        setUserInfo(result.data)
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);


  return (
    <div>
      {userInfo ? <div className="information">
        <p id="your-information">Profile Info</p>
        <div className="user-info">
          <div className="info">
            <p>
              <span> Full Name: </span>
              {userInfo[0].displayName}
            </p>
            <p>
              <span>age: </span>
              {userInfo[0].age}
            </p>
            
            <p>
              {" "}
              <span>Email: </span>
              {userInfo[0].email}
            </p>
            <p>
              {" "}
              <span>Gender:</span> {userInfo[0].gender}
            </p>
            <p>
              {" "}
              <span>city:</span> {userInfo[0].city}
            </p>
          </div>
        </div>
      </div>:""}
    </div>
  );
}
