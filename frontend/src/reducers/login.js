const initialState = {
  token: "",
  user_id :""
};

export const setToken = (token,user_id) => {
  return {
    type: "SET_TOKEN",
    payload: {token,user_id}
  };
};


const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return { token: payload.token ,user_id:payload.user_id};

     

    default:
      return state;
  }
};

export default login;
