let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("checkout")) {
    initialState = JSON.parse(localStorage.getItem("checkout"));
  } else {
    initialState = [];
  }
}

export const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CHECKOUT":
      return action.payload;
    default:
      return state;
  }
};