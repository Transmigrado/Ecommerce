let initialState = [];

// load order items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("order")) {
    initialState = JSON.parse(localStorage.getItem("order"));
  } else {
    initialState = [];
  }
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_ORDER":
      return action.payload;
    default:
      return state;
  }
};