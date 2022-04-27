import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { headerReducer } from "./headerReducer";
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer";
import { checkoutReducer } from "./checkoutReducer";

const rootReducer = combineReducers({
    search: searchReducer,
    cart: cartReducer,
    header: headerReducer,
    product: productReducer,
    checkout:checkoutReducer
  });
  
export default rootReducer;