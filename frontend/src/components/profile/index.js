import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import axios from "axios";
import "./profile.css";
import { useSelector } from "react-redux";

export default function Profile() {
  const [userInfo, setUserInfo] = useState("");
  const [userReservations, setUserReservations] = useState([]);
  const history = useHistory();
  const [kay, setKay] = useState("profile");
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}users`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setUserInfo(result.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}reservations`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setUserReservations(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={kay}
        onSelect={(k) => setKay(k)}
      >
        <Tab eventKey="profile" title="Profile">
          {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="reservation" title="reservation">
          {/* <Sonnet /> */}
        </Tab>
      </Tabs>

      {userInfo && kay === "profile" ? (
        <div className="profile-information">
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
            <div>
              {" "}
              <Button
                id="editButton"
                onClick={() => {
                  history.push("edit-profile");
                }}
              >
                edit profile
              </Button>
              <Button
                id="addBusinessButton"
                onClick={() => {
                  history.push(`/profile/addBusiness`);
                }}
              >
                Add a business
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {userReservations && kay === "reservation" ? (
        <div>
          {userReservations.map((element) => {
            return (
              <>
                
     <div className="inf_reservation">
                <Card>
    <Card.Img className="reservation-imag" variant="top" src={element.main_img} />
    <Card.Body>
      <Card.Text>
        <p> <span>Name: </span> {element.displayName}</p>
       <p><span>Price: </span>{element.booking_price}</p>
       <p><span>Date: </span>{element.reservation_date}</p>
       <p><span>Time: </span>{element.reservation_time}</p>
      </Card.Text>
    </Card.Body>
  </Card>
  </div>                
                 
               
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
