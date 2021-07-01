const initialState = {
    reservation_date: "",
    reservation_time :""
  };

  export const setReservation = ( reservation_date,reservation_time) => {
    return {
      type: "SET_RESERVATION",
      payload: { reservation_date,reservation_time}
    };
  };

  const reservation = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_RESERVATION":
        return { reservation_date: payload.reservation_date ,reservation_time:payload.reservation_time};
  
       
  
      default:
        return state;
    }
  };

  export default reservation;
