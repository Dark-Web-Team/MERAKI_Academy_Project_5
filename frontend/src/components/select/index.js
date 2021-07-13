import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FormControl, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { setReservation } from "../../reducers/reservation";
import "./select.css";

export default function TimeSelect({
  date,
  busnisses_id,
  opening_time,
  closing_time,
}) {
  opening_time = parseInt(opening_time.split(" ")[0]);
  if (opening_time === 12) {
    opening_time = 0;
  }
  closing_time = parseInt(closing_time.split(" ")[0]);
  const [time12pm, setTime12pm] = useState(false);
  const [time1pm, setTime1pm] = useState(false);
  const [time2pm, setTime2pm] = useState(false);
  const [time3pm, setTime3pm] = useState(false);
  const [time4pm, setTime4pm] = useState(false);
  const [time5pm, setTime5pm] = useState(false);
  const [time6pm, setTime6pm] = useState(false);
  const [time7pm, setTime7pm] = useState(false);
  const [time8pm, setTime8pm] = useState(false);
  const [time9pm, setTime9pm] = useState(false);
  const [time10pm, setTime10pm] = useState(false);
  const [time11pm, setTime11pm] = useState(false);
  const [userTime, setUserTime] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.login.token,
    };
  });

  const handileRes = () => {
    axios.post(
      `http://localhost:5000/reservations/${busnisses_id}`,
      { reservation_date: date, reservation_time: userTime },
      {
        headers: {
          authorization: "Bearer " + state.token,
        },
      }
    );
  };

  useEffect(() => {
    for (let i = opening_time; i < closing_time; i++) {
      console.log("i", i);
      if (i === 0) {
        setTime12pm(true);
      }
      if (i === 1) {
        setTime1pm(true);
      }
      if (i === 2) {
        setTime2pm(true);
      }
      if (i === 3) {
        setTime3pm(true);
      }
      if (i === 4) {
        setTime4pm(true);
      }
      if (i === 5) {
        setTime5pm(true);
      }
      if (i === 6) {
        setTime6pm(true);
      }
      if (i === 7) {
        setTime7pm(true);
      }
      if (i === 8) {
        setTime8pm(true);
      }
      if (i === 9) {
        setTime9pm(true);
      }
      if (i === 10) {
        setTime10pm(true);
      }
      if (i === 11) {
        setTime11pm(true);
      }
    }

    axios
      .get(`http://localhost:5000/reservations/${busnisses_id}/${date}`)
      .then((result) => {
        result.data.forEach((element) => {
          if (element.reservation_time === "12pm - 1pm") {
            setTime12pm(false);
          }
          if (element.reservation_time === "1pm - 2pm") {
            setTime1pm(false);
          }
          if (element.reservation_time === "2pm - 3pm") {
            setTime2pm(false);
          }
          if (element.reservation_time === "3pm - 4pm") {
            setTime3pm(false);
          }
          if (element.reservation_time === "4pm - 5pm") {
            setTime4pm(false);
          }
          if (element.reservation_time === "5pm - 6pm") {
            setTime5pm(false);
          }
          if (element.reservation_time === "6pm - 7pm") {
            setTime6pm(false);
          }
          if (element.reservation_time === "7pm - 8pm") {
            setTime7pm(false);
          }
          if (element.reservation_time === "8pm - 9pm") {
            setTime8pm(false);
          }
          if (element.reservation_time === "9pm - 10pm") {
            setTime9pm(false);
          }
          if (element.reservation_time === "10pm - 11pm") {
            setTime10pm(false);
          }
          if (element.reservation_time === "11pm - 12pm") {
            setTime11pm(false);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);
  return (
    <div>
      <FormControl
        className="TimeSelect"
        as="select"
        onChange={(e) => {
          setUserTime(e.target.value);
        }}
      >
        <option value="">Select a time...</option>
        {time12pm ? <option value="12pm - 1pm">12pm - 1pm</option> : ""}
        {time1pm ? <option value="1pm - 2pm">1pm - 2pm</option> : ""}
        {time2pm ? <option value="2pm - 3pm">2pm - 3pm</option> : ""}
        {time3pm ? <option value="3pm - 4pm">3pm - 4pm</option> : ""}
        {time4pm ? <option value="4pm - 5pm">4pm - 5pm</option> : ""}
        {time5pm ? <option value="5pm - 6pm">5pm - 6pm</option> : ""}
        {time6pm ? <option value="6pm - 7pm">6pm - 7pm</option> : ""}
        {time7pm ? <option value="7pm - 8pm">7pm - 8pm</option> : ""}
        {time8pm ? <option value="8pm - 9pm">8pm - 9pm</option> : ""}
        {time9pm ? <option value="9pm - 10pm">9pm - 10pm</option> : ""}
        {time10pm ? <option value="10pm - 11pm">10pm - 11pm</option> : ""}
        {time11pm ? <option value="11pm - 12pm">11pm - 12pm</option> : ""}
      </FormControl>
      {userTime ? (
        <Modal.Footer>
          <Button
            onClick={() => {
              dispatch(setReservation(date, userTime));
              // handileRes()
              history.push(`/payment/${busnisses_id}`);
            }}
          >
            reservation
          </Button>
        </Modal.Footer>
      ) : (
        ""
      )}
    </div>
  );
}
