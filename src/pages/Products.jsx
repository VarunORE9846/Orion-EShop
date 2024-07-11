import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  incrementQuantity,
  decrementQuantity,
  addToCart,
} from "../actions/cartActions";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantities = useSelector((state) => state.cart.quantities);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product successfully added to cart!", {
      position: "top-center",
    });
  };

  const handleAddToCartAndCheckout = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    navigate("/checkout");
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const handleSearchSubmit = () => {
    setShowSearchModal(false);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(
    (product) =>
      (categoryFilter === "" || product.category === categoryFilter) &&
      (searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Products</h2>
      <div className="mb-3 d-flex align-items-center">
        <FaSearch
          onClick={handleSearch}
          className="me-2"
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        />
        <div style={{ flexGrow: 1 }}>
          <label
            htmlFor="categoryFilter"
            className="form-label"
            style={{ fontSize: "0.9rem" }}
          >
            Filter by Category
          </label>
          <select
            id="categoryFilter"
            className="form-select form-select-sm"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
          >
            <option value="">All</option>
            {Array.from(
              new Set(products.map((product) => product.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            <div className="card h-100">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Category: {product.category}</p>
                <div className="mt-auto">
                  <div className="btn-group w-100" role="group">
                    <button
                      className="btn btn-secondary"
                      onClick={() => dispatch(decrementQuantity(product.id))}
                      disabled={(quantities[product.id] || 0) === 0}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                      disabled={(quantities[product.id] || 0) === 0}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => dispatch(incrementQuantity(product.id))}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center mt-2 mb-0">
                    Quantity: {quantities[product.id] || 0}
                  </p>
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleAddToCartAndCheckout(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationControl
        page={currentPage}
        between={1}
        total={Math.ceil(filteredProducts.length / itemsPerPage)}
        limit={1}
        changePage={(page) => setCurrentPage(page)}
        ellipsis={1}
      />
      <ToastContainer />

      <Modal show={showSearchModal} onHide={() => setShowSearchModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSearchModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSearchSubmit}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
