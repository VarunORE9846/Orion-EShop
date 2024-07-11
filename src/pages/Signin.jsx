import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Popup from "../components/Popup";
import "../App.css";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("SignupTable")) || [];
    setUsers(storedUsers);
  }, []);


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    firstname: Yup.string()
      .min(5, "First name must be at least 5 characters long")
      .matches(/^[a-z A-Z]+$/, "First name must contain only letters")
      .required("First name is required"),
    lastname: Yup.string()
      .min(5, "Last name must be at least 5 characters long")
      .matches(/^[a-z A-Z]+$/, "Last name must contain only letters")
      .required("Last name is required"),
    username: Yup.string()
      .min(5, "Username must be at least 5 characters long")
      .matches(/^[a-z A-Z]+$/, "User name must contain only letters")
      .required("Username is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/^[a-z A-Z]+$/, "Password must contain only letters and spcial characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm password is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Select a valid gender")
      .required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      try {
        const newUser = {
          email: values.email,
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          phoneNumber: values.phoneNumber,
          password: values.password,
          gender: values.gender,
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem("SignupTable", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);

        setPopupMessage("A new user ID is created");
        setShowPopup(true);
        setLoading(false);

        resetForm();
      } catch (error) {
        console.error("Error signing up:", error);
        setLoading(false);
      }
    },
  });

  const closePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const handlePhoneNumberInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  return (
    <div className="sign-in-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="sign-in-text-box">
          <h2>Sign Up</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
              className="input-field"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <input
              type="text"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              placeholder="First Name"
              className="input-field"
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <div className="error">{formik.errors.firstname}</div>
            )}

            <input
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              placeholder="Last Name"
              className="input-field"
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <div className="error">{formik.errors.lastname}</div>
            )}

            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Username"
              className="input-field-username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}

            <input
              type="tel"
              name="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              placeholder="Phone Number"
              className="input-field"
              onInput={handlePhoneNumberInput} 
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="error">{formik.errors.phoneNumber}</div>
            )}

            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
              className="input-field"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}

            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Confirm Password"
              className="input-field"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error">{formik.errors.confirmPassword}</div>
            )}

            <div className="inline-block relative w-64">
              <select
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                className="input-field"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="error">{formik.errors.gender}</div>
              )}
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
          {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
        </div>
      )}
    </div>
  );
};

export default Signin;
