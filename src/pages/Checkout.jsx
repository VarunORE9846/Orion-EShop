import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart, clearCart, setCartItems } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import OrderModal from './Modal'; 
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      dispatch(setCartItems(JSON.parse(savedCartItems)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalPrice = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Product removed successfully!");
  };

  const handleClearCart = () => {
    if (Object.keys(cartItems).length === 0) {
      toast.error("No products in the cart!");
    } else {
      dispatch(clearCart());
      toast.info("All items removed from the cart!");
    }
  };

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(false);
    console.log("Order placed successfully!");
    toast.success("Order placed successfully!");
    dispatch(clearCart());
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="d-flex justify-content-between mb-3">
        <h3>Total Price: ${getTotalPrice()}</h3>
        <button className="btn btn-danger" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>
      <div className="row">
        {Object.values(cartItems).map((item) => (
          <div key={item.id} className="col-md-12 mb-3">
            <div className="card h-100 d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-column justify-content-between flex-grow-1">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity(item.id, parseInt(e.target.value)))}
                  min="1"
                  className="form-control mb-2"
                />
                <button className="btn btn-danger mb-2" onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
                <div className="text-center mt-2">
                  <span>Total: ${item.price * item.quantity}</span>
                </div>
              </div>
              <img
                src={item.thumbnail}
                className="card-img-right"
                alt={item.title}
                style={{ height: "150px", width: "150px", objectFit: "cover" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-2">
        <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmOrder}
      />
      <ToastContainer />
    </div>
  );
};

export default Checkout;