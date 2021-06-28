import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken"
import { Button } from "react-bootstrap";
import axios from "axios";
import "./profile.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const [userInfo, setUserInfo] = useState("");
  let thisToken = localStorage.getItem("token");
  const history = useHistory();
  const token = useSelector(state => state.login.token)
  let userId = ""

  const getUserId = async ()=>{
        const token1= token.split(' ').pop();
        try{
        const tokenPayload = await jwt.decode(token1);
        console.log(tokenPayload)
        userId = tokenPayload.user_id 
        history.push(`/profile/${userId}/addBusiness`)
        } catch(err){
            console.log(err);
            throw err
        }
  }


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}users`, {
        headers: {
          authorization: "Bearer " + thisToken,
        },
      })
      .then((result) => {
        setUserInfo(result.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <>
      {userInfo ? (
        <div className="information">
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
           <div> <Button id="editButton" onClick={()=>{history.push("edit-profile")}} >edit profile</Button> 
           <Button id="addBusinessButton" onClick={getUserId} >Add a business</Button>
           </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
