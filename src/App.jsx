import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';
import { errorBoundary } from "./helpers/errorBoundary";
import Layout from "./layout/Layout";

// lazy loading
const Home = lazy(() => import("./pages/Home"));
//const Header = lazy(() => import("./components/nav/Header"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ProductDetails = lazy(() => import("./pages/product-details/ProductDetails"));
const Payment = lazy(() => import("./pages/payment/Payment"));

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
      |<Layout>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/product-details/:id" component={ProductDetails} />
            <Route exact path="/payment" component={Payment} />
            <Route component={NotFound} />
        </Switch>
      </Layout> 
    </Suspense>
  );
};

// pattern design react: HOC
export default errorBoundary(App);
