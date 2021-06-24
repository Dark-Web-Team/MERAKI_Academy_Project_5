const initialState = {
    path: "/",
  };
  
  export const setPath = (path) => {
    return {
      type: "SET_PATH",
      payload: path,
    };
  };
  
  const lastVisited = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_PATH":
        return { token: payload };
  
      default:
        return state;
    }
  };
  
  export default lastVisited;