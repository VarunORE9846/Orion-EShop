import React from 'react';
import '../App.css';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-popup-button">Close</button>
      </div>
    </div>
  );
};

export default Popup;
