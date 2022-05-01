import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer";
import { checkoutReducer } from "./checkoutReducer";
import { orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    product: productReducer,
    checkout:checkoutReducer,
    order: orderReducer
  });
  
export default rootReducer;