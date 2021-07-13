import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Rating from "../rating/rating";
import Chat from "../chat";
import "./style.css";
import ShowRating from "../category/ShowRating";
import TimeSelect from "../select";
import "react-image-gallery/styles/css/image-gallery.css";
import { FormControl, Button, Alert, Modal, Form } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaUserCircle, FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import ShowMap from "./../googleMap/showMap";
import io from "socket.io-client";
let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

export default function Busnisses() {
  const history = useHistory();
  // STATES
  const [pictures, setPictures] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [business, setBusiness] = useState("");
  const [commints, setCommints] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [userRate, setUserRate] = useState(false);
  const [info, setInfo] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [startDate, setStartDate] = useState(new Date());
  const [reservationDate, setReservationDate] = useState("");
  const [staePrimaryRef, setStaePrimaryRef] = useState(null);
  const [stateSecondaryRef, setStateSecondaryRef] = useState(null);
  const [ownerImage, setOwnerImage] = useState("");

  //TOKEN
  const thisToken = localStorage.getItem("token");
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      user_id: state.login.user_id,
      user_name: state.login.user_name,
    };
  });

  const handleShow = () => {
    if (state.token) {
      setShow(true);
    } else {
      history.push("/login");
    }
  };

  // FUNCTIONS ---------------------------------------------------
  let arr;
  const getimages = async () => {
    try {
      const picture = await axios.get(`http://localhost:5000/image/${id}`);
      arr = picture.data.map((elem, i) => {
        return elem.image;
      });
      setPictures(arr);
    } catch (error) {
      setErrMessage(error.data);
    }
  };

  const getDetails = async () => {
    try {
      const details = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}business/id/${id}`
      );
      setBusiness(details.data[0]);
    } catch (error) {
      setErrMessage(error.data);
    }
  };

  const getCommit = async () => {
    try {
      const details = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER}comments/${id}`
      );
      setCommints(details.data);
    } catch (error) {
      setErrMessage(error.data);
    }
  };

  const getUserrate = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}rating/${id}`, {
        headers: {
          authorization: "Bearer " + state.token,
        },
      })
      .then((result) => {
        setUserRate(result.data[0].rate);
      })
      .catch((err) => {
        if (err.response.data == "not found") {
          setUserRate(false);
        }
      });
  };

  const addComment = () => {
    if (state.token) {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_SERVER}comments/${id}`,
          { comment: userComment },
          {
            headers: {
              authorization: "Bearer " + state.token,
            },
          }
        )
        .then((result) => {
          if (info) {
            setInfo(false);
            setUserComment("");
          } else {
            setInfo(true);
            setUserComment("");
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      history.push("/login");
    }
  };

  const deleteComment = (comment_id) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_SERVER}comments/${comment_id}`,

        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        }
      )
      .then((result) => {
        if (info) {
          setInfo(false);
        } else {
          setInfo(true);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const addPhotoToBusiness = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}image/${id}`,
        {
          image: ownerImage,
        },
        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        }
      )
      .then((result) => {
        if (result.status === 201) {
          handleClose2();
          if (info) {
            setInfo(false);
          } else {
            setInfo(true);
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  //-----------------------------------------------------

  // GALLERY
  const primaryRef = useRef();
  if (primaryRef.current) {
    if (!staePrimaryRef) {
      setStaePrimaryRef(true);
    }
  }

  const secondaryRef = useRef();
  if (secondaryRef.current) {
    if (!stateSecondaryRef) {
      setStateSecondaryRef(true);
    }
  }

  const primaryOptions = {
    type: "loop",
    width: 900,
    height: 400,
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    pagination: false,
  };

  const secondaryOptions = {
    fixedWidth: 100,
    height: 60,
    gap: 10,
    cover: true,
    pagination: false,
    isNavigation: true,
    focus: "center",
    arrows: false,

    breakpoints: {
      600: {
        fixedWidth: 66,
        height: 40,
      },
    },
  };

  // useEffect

  useEffect(() => {
    if (primaryRef.current) {
      primaryRef.current.sync(secondaryRef.current.splide);
    }
    getimages();
    getDetails();
    getCommit();
    getUserrate();
  }, [staePrimaryRef, info, state.token]);

  const chatWhitOnwer = () => {
    socket = io(CONNECTION_PORT);
    socket.emit("join_userList", business.owner_id);
    const messageContent = {
      roomId: business.owner_id,
      content: {
        user1_id: business.owner_id,
        user2_id: state.user_id,
        user1_name: business.userName,
        user2_name: state.user_name,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}chat/userChat`,
        {
          user2_id: business.owner_id,
          user1_name: business.userName,
          user2_name: state.user_name,
        },
        {
          headers: {
            authorization: "Bearer " + state.token,
          },
        }
      )
      .then((result) => {
        if (result.status === 201) {
          socket.emit("send_message_req", messageContent);
        }
        // history.push("/chat");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      {business ? (
        <div>
          <h1 className="header">{business.displayName}</h1>
          <div className="parent">
            <div className="gallery">
              <Splide
                className="asasa"
                options={primaryOptions}
                ref={primaryRef}
              >
                {pictures.map((elem, i) => {
                  return (
                    <SplideSlide>
                      <img width="900" height="450" src={elem} />
                    </SplideSlide>
                  );
                })}
              </Splide>
              <Splide options={secondaryOptions} ref={secondaryRef}>
                {pictures.map((elem, i) => {
                  return (
                    <SplideSlide>
                      <img src={elem} />
                    </SplideSlide>
                  );
                })}
              </Splide>
              {errMessage}

              {business.owner_id === state.user_id ? (
                <div>
                  <Button onClick={handleShow2}> add photo </Button>
                  <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FormControl
                        placeholder="add link for photo "
                        type="text"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        type="text"
                        onChange={(e) => {
                          setOwnerImage(e.target.value);
                        }}
                      />
                      <Button onClick={addPhotoToBusiness}> add photo </Button>
                    </Modal.Body>
                  </Modal>
                </div>
              ) : (
                ""
              )}
              <h2>Description</h2>
              <p className="description">{business.description}</p>
            </div>
            <div className="information">
              <p className="city-info">
                <span>City :</span> {business.city}
              </p>
              <p className="price">
                <span>Price :</span> {business.booking_price} JD
              </p>

              <div className="rate-container">
                <div className="rate">
                  <div className="FaStar">
                    <FaStar size={26} />
                    <sup>{business.average_rating} / 5 </sup>
                  </div>
                  <div>
                    <sub> from {business.number_rating} users</sub>
                  </div>
                </div>
                <div className="user-rating">
                  {!userRate ? (
                    <>
                      <p> Rate this </p>
                      <Rating
                        id={id}
                        thisToken={state.token}
                        setInfo={setInfo}
                      />
                    </>
                  ) : (
                    <>
                      <p>Your rate</p> <ShowRating rate={userRate} />
                    </>
                  )}
                </div>
              </div>
              <>
                {business.owner_id !== state.user_id ? (
                  <div className="business-chat-reserve">
                    <Button
                      id="Button-Reserve"
                      variant="primary"
                      onClick={handleShow}
                      className="business-button"
                    >
                      Reserve
                    </Button>
                    <Button onClick={chatWhitOnwer} className="business-button">
                      chat with owner
                    </Button>
                  </div>
                ) : (
                  ""
                )}

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Reservation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="block">
                    <DatePicker
                      className="calender"
                      selected={startDate}
                      dateFormat="yyyy/MM/dd"
                      onChange={(date) => {
                        let array = date
                          .toString()
                          .split(" ")
                          .splice(1, 3)
                          .reverse();
                        const array_move = (arr, old_index, new_index) => {
                          if (new_index >= arr.length) {
                            let k = new_index - arr.length + 1;
                            while (k--) {
                              arr.push(undefined);
                            }
                          }
                          arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                          return arr;
                        };
                        let orgArr = array_move(array, 1, 2);
                        if (orgArr[1] === "Jan") {
                          orgArr[1] = "01";
                        }
                        if (orgArr[1] === "Feb") {
                          orgArr[1] = "02";
                        }
                        if (orgArr[1] === "Mar") {
                          orgArr[1] = "03";
                        }
                        if (orgArr[1] === "Apr") {
                          orgArr[1] = "04";
                        }
                        if (orgArr[1] === "May") {
                          orgArr[1] = "05";
                        }
                        if (orgArr[1] === "Jun") {
                          orgArr[1] = "06";
                        }
                        if (orgArr[1] === "Jul") {
                          orgArr[1] = "07";
                        }
                        if (orgArr[1] === "Aug") {
                          orgArr[1] = "08";
                        }
                        if (orgArr[1] === "Sep") {
                          orgArr[1] = "09";
                        }
                        if (orgArr[1] === "Oct") {
                          orgArr[1] = "10";
                        }
                        if (orgArr[1] === "Nov") {
                          orgArr[1] = "11";
                        }
                        if (orgArr[1] === "Dec") {
                          orgArr[1] = "12";
                        }
                        orgArr = orgArr.join("-");
                        setReservationDate(orgArr);
                        setStartDate(date);
                      }}
                    />
                    <TimeSelect
                      busnisses_id={id}
                      date={reservationDate}
                      opening_time={business.opening_time}
                      closing_time={business.closing_time}
                    />
                  </Modal.Body>
                </Modal>
              </>
              <div className="information-map">
                <ShowMap
                  lat={business.lat}
                  lng={business.lng}
                  width={"inherit"}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="parent_comment-chat">
        <div className="comments">
          <h1>Comments&nbsp;&nbsp;&nbsp;&nbsp;</h1>
          <div className="containers">
            {commints.map((element) => {
              return (
                <div className="comment">
                  <div className="commenter">
                    <FaUserCircle class="profilePic_2" />

                    <span>{element.displayName}</span>
                    {state.user_id == element.user_id ? (
                      <AiOutlineDelete
                        className="delete"
                        onClick={() => {
                          deleteComment(element.comment_id);
                        }}
                      >
                        delete comment
                      </AiOutlineDelete>
                    ) : (
                      ""
                    )}

                    <p class="answer">{element.comment}</p>
                  </div>

                  <div className="comment2"></div>
                </div>
              );
            })}
            <div className="input-commet">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    onChange={(e) => {
                      setUserComment(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <Button className="singUpButton" onClick={addComment}>
                add Comment
              </Button>
            </div>
          </div>
        </div>

        <div className="chat">
          <Chat roomId={id} userId={state.user_id} />
        </div>
      </div>
    </>
  );
}
