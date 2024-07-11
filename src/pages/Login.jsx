import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../components/Loader";
import "../App.css";
import "react-toastify/dist/ReactToastify.css";

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(4, "too short").required("Required"),
  password: Yup.string().min(4, "Too Short!").required("Required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (values) => {
    const payload = {
      username: values.username,
      password: values.password,
      expiresInMins: 30,
    };
    try {
      setLoading(true);
      const res = await axios.post("https://dummyjson.com/auth/login", payload);

      if (res.status === 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        navigate("/profile");
      } else {
      }
    } catch (error) {
      console.log("Error from API--", error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="sign-in-text-box">
          <h2>Log In</h2>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogIn}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input-field"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-field"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting || loading}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className="forgot-password-button"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot  Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Login;
