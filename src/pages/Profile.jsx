import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import maleImage from "../assets/male.png";
import femaleImage from "../assets/female.png";
import "../App.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usersData = localStorage.getItem("loggedInUser");
    if (usersData) {
      const users = JSON.parse(usersData);
      setUser(users);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const profileImage = user?.gender === "male" ? maleImage : femaleImage;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h2>{user?.firstName} {user?.lastName}</h2>
        <p>
          {user?.username}
        </p>
        <span className="email">{user?.email}</span>
        <span>{user?.stateCode}</span>
        <p>Phone Number:+91 7696138810</p>
        <p>Gender: {user?.gender}</p>
        <p className="bio">
          Enthusiastic JavaScript Developer with a decade of expertise in
          developing strong and efficient web applications. Expert in using
          React JS, Redux, and various other front-end technologies to develop
          interactive user interfaces. Competent in working with teams from
          different areas to provide top-notch solutions that fulfill customer
          needs and improve the user experience.
        </p>
        <div className="profile-actions">
          <button className="message-button">Message</button>
          <button className="contact-button">Contact</button>
        </div>
      </div>
    </div>
  );
};


export default Profile;
