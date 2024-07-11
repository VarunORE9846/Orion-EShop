import React from 'react';
import Modal from 'react-modal';
import '../App.css'; 

//Modal.setAppElement('#root');

const OrderModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Place Order Confirmation"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Confirm Your Order</h2>
        <button onClick={onRequestClose} className="close-button">&times;</button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to place this order?</p>
      </div>
      <div className="modal-footer">
        <button onClick={onRequestClose} className="modal-button cancel-button">Cancel</button>
        <button onClick={onConfirm} className="modal-button confirm-button">Confirm</button>
      </div>
    </Modal>
  );
};

export default OrderModal;