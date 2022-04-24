import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';
import { errorBoundary } from "./helpers/errorBoundary";


// lazy loading
const Home = lazy(() => import("./pages/Home"));
//const Header = lazy(() => import("./components/nav/Header"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <CircularProgress />
        </div>
      }
    >
      {/*<Header />*/}
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

// pattern design react: HOC
export default errorBoundary(App);
