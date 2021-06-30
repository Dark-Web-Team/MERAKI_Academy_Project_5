import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Rating from "../rating/rating";
import "./style.css";
import ImageGallery from "react-image-gallery";
import ShowRating from "../category/ShowRating";
import TimeSelect from "../select";
import "react-image-gallery/styles/css/image-gallery.css";
import { FormControl, Button, Alert, Modal } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";

export default function Busnisses() {
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
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());
  const [reservationDate, setReservationDate] = useState("");
  const [staePrimaryRef, setStaePrimaryRef] = useState(null);
  const [stateSecondaryRef, setStateSecondaryRef] = useState(null);

  //TOKEN
  const thisToken = localStorage.getItem("token");
  const { id } = useParams();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      user_id: state.login.user_id,
    };
  });

  // FUNCTIONS ---------------------------------------------------
  let arr;
  const getimages = async () => {
    try {
      const picture = await axios.get(`http://localhost:5000/image/${id}`);
      arr = picture.data.map((elem, i) => {
        return elem.image;
      });
      console.log(arr);
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
          authorization: "Bearer " + thisToken,
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
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_SERVER}comments/${id}`,
        { comment: userComment },
        {
          headers: {
            authorization: "Bearer " + thisToken,
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
        console.log(err);
      });
  };

  const deleteComment = (comment_id) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_SERVER}comments/${comment_id}`,

        {
          headers: {
            authorization: "Bearer " + thisToken,
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
        console.log(err);
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
    height:400,
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
    getimages();
    getDetails();
    getCommit();
    getUserrate();
    if (primaryRef.current) {
      primaryRef.current.sync(secondaryRef.current.splide);
    }
  }, [staePrimaryRef, info]);
  return (
    <>
      {business ? (
        <div className="parent">
          <div className="gallery">
            <Splide options={primaryOptions} ref={primaryRef}>
              {pictures.map((elem, i) => {
                return (
                  <SplideSlide>
                    <img width="900" height = '450' src={elem} />
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
          </div>
          <div className="information">
            <h1 className="header">{business.displayName}</h1>
            <p className="description">{business.description}</p>
            <p>{business.city}</p>
            <p>
              {" "}
              <div className="rate">
                <ShowRating rate={business.average_rating} /> Review from{" "}
                {business.number_rating} User
              </div>
            </p>
            <p className="price">${business.booking_price} JD</p>
            {!userRate ? (
              <>
                <p>Your rate</p>{" "}
                <Rating id={id} thisToken={thisToken} setInfo={setInfo} />
              </>
            ) : (
              <>
                <p>Your rate</p> <ShowRating rate={userRate} />
              </>
            )}
            <>
              <Button variant="primary" onClick={handleShow}>
                Reserve
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <DatePicker
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
                  <TimeSelect busnisses_id={id} date={reservationDate} />
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="user-rate">
        <h1 className="comments">Comments&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <div className="containers">
          {commints.map((element) => {
            return (
              <div className="comment">
                <div className="commenter">
                  <FaUserCircle class="profilePic_2" />
                  <p id="name_2">{element.displayName}</p>
                  <p class="answer">{element.comment}</p>
                </div>

                <div className="comment2">
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
                </div>
              </div>
            );
          })}
          <div>
            <FormControl
              placeholder="your Comment"
              type="text"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              type="text"
              value={userComment}
              onChange={(e) => {
                setUserComment(e.target.value);
              }}
            />
            <Button className="singUpButton" onClick={addComment}>
              add Comment
            </Button>
          </div>
        </div>
      </div>
      <div className="comments"></div>
    </>
  );
}
