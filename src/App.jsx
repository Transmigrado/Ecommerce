import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';
import Layout from "./layout/Layout";
import { ErrorBoundary } from "react-error-boundary";

// lazy loading
const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const ProductDetails = lazy(() => import("./pages/product-details/ProductDetails"));
const Payment = lazy(() => import("./pages/payment/Payment"));
const History = lazy(() => import("./pages/History"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <CircularProgress />
        </div>
      }
    >
        <ErrorBoundary
          fallbackRender={({error, componentStack, resetErrorBoundary}) => (
            <div role="alert">
              <div>Something went wrong!!</div>
              <pre>{error.message}</pre>
              <button onClick={() => { resetErrorBoundary() }}>
                Try again
              </button>
            </div>
          )}
        >  
          <ToastContainer />
          |<Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/product-details/:id" component={ProductDetails} />
                <Route exact path="/payment" component={Payment} />
                <Route exact path="/history" component={History} />
                <Route component={NotFound} />
            </Switch>
          </Layout>
        </ErrorBoundary> 
    </Suspense>
  );
};

// pattern design react: HOC
export default errorBoundary(App);
