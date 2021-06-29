import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FormControl, Button } from "react-bootstrap";

const date = "2021-07-2";
const busnisses_id = 3

export default function TimeSelect() {
  const [time6pm, setTime6pm] = useState(true);
  const [time7pm, setTime7pm] = useState(true);
  const [time8pm, setTime8pm] = useState(true);
  const [time9pm, setTime9pm] = useState(true);
  const [time10pm, setTime10pm] = useState(true);
  const [time11pm, setTime11pm] = useState(true);
  const [userTime, setUserTime] = useState("");

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
    axios
      .get(`http://localhost:5000/reservations/${busnisses_id}/${date}`)
      .then((result) => {
        console.log(result.data);
        result.data.forEach((element) => {
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
  }, [state]);

  return (
    <div>
      <FormControl
        as="select"
        onChange={(e) => {
          setUserTime(e.target.value);
        }}
      >
        <option>Select a time...</option>
        {time6pm ? <option value="6pm - 7pm">6pm - 7pm</option> : ""}
        {time7pm ? <option value="7pm - 8pm">7pm - 8pm</option> : ""}
        {time8pm ? <option value="8pm - 9pm">8pm - 9pm</option> : ""}
        {time9pm ? <option value="9pm - 10pm">9pm - 10pm</option> : ""}
        {time10pm ? <option value="10pm - 11pm">10pm - 11pm</option> : ""}
        {time11pm ? <option value="11pm - 12pm">11pm - 12pm</option> : ""}
      </FormControl>
      <Button className="singUpButton" onClick={handileRes}>
        Update Your Info
      </Button>
    </div>
  );
}
