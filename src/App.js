import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import { Home } from "./pages/Home";
import Logout from "./pages/Logout"; 
import { Outlet } from "react-router-dom";
import PublicRoutes from "./Utils/PublicRoute";
import PrivateRoute from "./Utils/PrivateRoute";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider, useLoading } from "./LoadingContext";

const AppRoutes = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        element={
          <PublicRoutes>
            <Outlet />
          </PublicRoutes>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
      </Route>

      <Route
        element={
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        }
      >
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/logout" element={<Logout />} /> 
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <Router>
        <Header />
        <AppRoutes />
        <ToastContainer />
        <LoaderContainer />
      </Router>
    </LoadingProvider>
  );
};

const LoaderContainer = () => {
  const { loading } = useLoading();
  return loading ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Loader />
    </div>
  ) : null;
};

export default App;