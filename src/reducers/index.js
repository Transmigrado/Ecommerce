import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { headerReducer } from "./headerReducer";
import { cartReducer } from "./cartReducer"
import { productReducer } from "./productReducer";

const rootReducer = combineReducers({
    search: searchReducer,
    cart: cartReducer,
    header: headerReducer,
    product: productReducer
  });
  
export default rootReducer;