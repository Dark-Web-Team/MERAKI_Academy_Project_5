import React, { useState,useEffect } from "react";
import axios from "axios";
import {
    FormControl,
    
  } from "react-bootstrap";

export default function TimeSelect() {
const [time6pm, setTime6pm] = useState(true);
const [time8pm, setTime8pm] = useState(true);
const [time10pm, setTime10pm] = useState(true);

useEffect(()=>{
    axios.get("http://localhost:5000/reservations/3/2021-06-1").then((result)=>{
        console.log(result.data);
        result.data.forEach(element=>{
            if (element.reservation_time == "6pm - 8pm" ){
                setTime6pm(false)
            }
            if (element.reservation_time == "8pm - 10pm" ){
                setTime8pm(false)
            }
            if (element.reservation_time == "10pm - 12pm" ){
                setTime10pm(false)
            }
        })

    }).catch(err=>{
        console.log(err);
    })
},[])

    return (
        <div>
            <FormControl
          as="select"
          onChange={(e) => {
            
          }}
        >
          <option>Select a time...</option>
          {time6pm ? <option value="6pm - 8pm">6pm - 8pm</option> :""}
          {time8pm ? <option value="8pm - 10pm">8pm - 10pm</option> :""}
          {time10pm ? <option value="10pm - 12pm">10pm - 12pm</option> :""}
        </FormControl>
        </div>
    )
}
