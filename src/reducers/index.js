import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { headerReducer } from "./headerReducer";
import { cartReducer } from "./cartReducer"

const rootReducer = combineReducers({
    search: searchReducer,
    cart: cartReducer,
    header: headerReducer,
  });
  
export default rootReducer;