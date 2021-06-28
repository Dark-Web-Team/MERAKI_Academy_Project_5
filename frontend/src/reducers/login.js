const initialState = {
  token: "",
  user_id :""
};

export const setToken = (token) => {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
};

export const setUser_id = (user_id) => {
  return {
    type: "SET_USER_ID",
    payload: user_id,
  };
};

const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TOKEN":
      return { token: payload };

      case "SET_USER_ID":
      return { user_id: payload };

    default:
      return state;
  }
};

export default login;
