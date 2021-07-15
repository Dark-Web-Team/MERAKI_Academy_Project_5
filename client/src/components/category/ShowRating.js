import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsStarHalf } from "react-icons/bs";
export default function ShowRating({ rate }) {
  const [halfStar, setHalfStar] = useState(false);
  if (rate - Math.floor(rate) >= 0.5) {
    if (!halfStar) {
      setHalfStar(true);
    }
  } else {
    if (halfStar) {
      setHalfStar(false);
    }
  }

  return (
    <div>
      <div className="rating">
        {[...Array(Math.floor(rate))].map((element, i) => {
          return <FaStar size={22} color={"gold"} />;
        })}
        {halfStar ? <BsStarHalf size={22} color={"gold"} /> : ""}
      </div>
    </div>
  );
}
