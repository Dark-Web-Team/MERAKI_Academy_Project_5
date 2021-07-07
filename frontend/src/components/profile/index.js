import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import axios from "axios";
import "./profile.css";
import { useSelector } from "react-redux";
import ShowMap from "../googleMap/showMap";
import Footer from "./../footer/index";

export default function Profile() {
  const [userInfo, setUserInfo] = useState("");
  const [userReservations, setUserReservations] = useState([]);
  const [userBusiness, setUserBusiness] = useState([]);
  const [kay, setKay] = useState("profile");
  const [role, setRole] = useState("");
  const history = useHistory();

  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    if (token) {
      const ownerConformation = jwt.decode(token);
      setRole(ownerConformation.role);
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
          console.log(err.response);
        });
      axios
        .get(`${process.env.REACT_APP_BACKEND_SERVER}reservations`, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((result) => {
          console.log(result);
          setUserReservations(result.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${process.env.REACT_APP_BACKEND_SERVER}business/user`, {
          headers: {
            authorization: "Bearer " + token,
          },
        })
        .then((result) => {
          console.log(result);
          setUserBusiness(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  return (
    <>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={kay}
        onSelect={(k) => setKay(k)}
      >
        <Tab eventKey="profile" title="Profile"></Tab>
        <Tab eventKey="reservation" title="reservation"></Tab>
        {role === "owner" && (
          <Tab eventKey="business" title="My Business"></Tab>
        )}
      </Tabs>

      {userInfo && kay === "profile" ? (
        <div key={500} className="profile-information">
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
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {userReservations && kay === "reservation" ? (
        <div>
          {userReservations.map((element, i) => {
            console.log(userReservations);
            let date = element.reservation_date;
            date = date.split("T")[0].split("-").reverse().join("-");
            return (
              <>
                <div key={i} className="Resinf_business">
                  <div className="business_img">
                    <img
                      src={element.main_img}
                      alt={element.displayName}
                      className="Resimage"
                    ></img>
                  </div>
                  <div className="business_info">
                    <p>Business Name: {element.displayName}</p>
                    <p>Price: {element.booking_price} </p>
                    <p>
                      <span>Date: </span>
                      {date}
                    </p>
                    <p>
                      <span>Time: </span>
                      {element.reservation_time}
                    </p>
                    <Button
                      onClick={() => {
                        history.push(`/business/${element.business_id}`);
                      }}
                    >
                      Go to business
                    </Button>
                  </div>
                  <div className="Resbusiness_desc">
                    <span>{element.description}</span>
                  </div>
                  <div className="location">
                    <ShowMap
                      width={"23vw"}
                      height={"31.75vh"}
                      lat={element.lat}
                      lng={element.lng}
                    />
                  </div>
                </div>
              </>
              // <>
              //   <div className="inf_reservation">
              //     <Card>
              //       <Card.Img
              //         className="reservation-imag"
              //         variant="top"
              //         src={element.main_img}
              //       />
              //       <Card.Body>
              //         <Card.Text>
              //           <p>
              //             {" "}
              //             <span>Name: </span> {element.displayName}
              //           </p>
              //           <p>
              //             <span>Price: </span>
              //             {element.booking_price}
              //           </p>
              //           <p>
              //             <span>Date: </span>
              //             {date}
              //           </p>
              //           <p>
              //             <span>Time: </span>
              //             {element.reservation_time}
              //           </p>
              //         </Card.Text>
              //       </Card.Body>
              //     </Card>
              //   </div>
              // </>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {userBusiness && kay === "business" ? (
        <div>
          {userBusiness.map((element, i) => {
            return (
              <>
                <div key={i} className="main_business">
                  <div className="business_img">
                    <img
                      src={element.main_img}
                      alt={element.displayName}
                      className="image"
                    ></img>
                  </div>
                  <div className="inf_business">
                    <div className="business_info">
                      <p>Business Name: {element.displayName}</p>
                      <p>City: {element.city} </p>
                      <p>Price: {element.booking_price} </p>
                      <p>
                        Opening Time: {element.opening_time} &nbsp; &nbsp;
                        &nbsp; Closing Time: {element.closing_time}
                      </p>
                      <Button
                        onClick={() => {
                          history.push(`/business/${element.business_id}`);
                        }}
                      >
                        Go to business
                      </Button>
                    </div>
                    <div className="business_desc">
                      <span>{element.description}</span>
                    </div>
                    <div className="location">
                      <ShowMap
                        width={"30vw"}
                        height={"40vh"}
                        lat={element.lat}
                        lng={element.lng}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {userBusiness.length === 0 && kay === "business" ? (
        <div className="noBusiness">
          <Button
            id="addBusinessButton"
            onClick={() => {
              history.push(`/profile/addBusiness`);
            }}
          >
            Add a business
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
