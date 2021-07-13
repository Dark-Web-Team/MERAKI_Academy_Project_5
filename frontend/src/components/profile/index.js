import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import axios from "axios";
import "./profile.css";
import "./Profile2.css";
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
    <div className="Tabs-nav">
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
      </div>

      {userInfo && kay === "profile" ? (
        <div >
          

	<section class="profile_container">
		<div class="profile_img_section">
			<img class="profile_img-LG" src="https://scontent-hbe1-1.xx.fbcdn.net/v/t1.6435-9/137228544_3532653123528378_7616780502827546260_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=0debeb&_nc_eui2=AeG41YuVLrvLIC0cBob42Qta0NZYniBPW9rQ1lieIE9b2ooKOpF86YPSU6Rp7-UgudXqYyqU0GynaHsfOD192bwE&_nc_ohc=T43UiMtMLN4AX-w7809&_nc_ht=scontent-hbe1-1.xx&oh=7b79099390ee649805b089313bdef8b5&oe=60F0F90E" />
		
		</div>

		<div class="profile_desc_section">
			<h2 className = 'H2'>{userInfo[0].displayName}</h2>
			<h3  className = 'H3'> {userInfo[0].email}</h3>
      <div class="interests">
				<span class="interests_item">{userInfo[0].gender}</span>
				
        <span class="interests_item">Age ... {userInfo[0].age}</span>
			</div>
			<p class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      
      <ul>
			<li>
				<div class="link_img_wrapper">
					<img class="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/round-pushpin_1f4cd.png" alt=""/>
				</div>
				<p>{userInfo[0].city}</p>
			</li>
	</ul>
		
		</div>
    <Button
                id="editButton"
                onClick={() => {
                  history.push("edit-profile");
                }}
              >
                edit profile
              </Button>
	</section>

	{/* <div class="info">
		<ul>
			<li>
				<div class="link_img_wrapper">
					<img class="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/round-pushpin_1f4cd.png" alt=""/>
				</div>
				<p>{userInfo[0].city}</p>
			</li>
			<li>
				<div class="link_img_wrapper">
					<img class="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/speaking-head_1f5e3-fe0f.png" alt=""/>
				</div>
				<p>Korean, English</p>
			</li>
			<li>
				<div class="link_img_wrapper">
					<img class="link_img" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/samsung/265/globe-with-meridians_1f310.png" alt=""/>
				</div>
				<p>sandbox.kr/samsantech</p>
			</li>
		</ul>
	</div> */}
 
        </div>
        // <div key={500} className="profile-information">
        //   <p id="your-information">Profile Info</p>
        //   <div className="user-info">
        //     <div className="info">
        //       <p>
        //         <span> Full Name: </span>
        //         {userInfo[0].displayName}
        //       </p>
        //       <p>
        //         <span>age: </span>
        //         {userInfo[0].age}
        //       </p>

        //       <p>
        //         {" "}
        //         <span>Email: </span>
        //         {userInfo[0].email}
        //       </p>
        //       <p>
        //         {" "}
        //         <span>Gender:</span> {userInfo[0].gender}
        //       </p>
        //       <p>
        //         {" "}
        //         <span>city:</span> {userInfo[0].city}
        //       </p>
        //     </div>
        //     <div>
        //       {" "}
        //       <Button
        //         id="editButton"
        //         onClick={() => {
        //           history.push("edit-profile");
        //         }}
        //       >
        //         edit profile
        //       </Button>
        //     </div>
        //   </div>
        // </div>
      ) : (
        ""
      )}
      {userReservations && kay === "reservation" ? (
        <div className = 'reservation_Container'>
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
                    <p> Business Name:{element.displayName}</p>
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
        <div className = 'user_Business'>
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
                      <p className="business_info-p">Business Name: {element.displayName}</p>
                      <p className="business_info-p">City: {element.city} </p>
                      <p className="business_info-p">Price: {element.booking_price} </p>
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
                    
                   
                  </div>
                </div>
                <div className = "pareants-map-desc">
                
                  <div className="business_desc">
                       <h2>description</h2>
                      <p>{element.description}</p>
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
