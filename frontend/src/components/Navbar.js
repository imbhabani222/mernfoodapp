import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Model from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "../components/ContextReducer";

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-2">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
              {localStorage.getItem("authToken") && (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myorder"
                >
                  My Orders
                </Link>
              )}
            </div>

            <div className="d-flex ">
              {!localStorage.getItem("authToken") ? (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success max-1"
                    to="/createuser"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="btn bg-dark text-white mx-2"
                    onClick={() => setCartView(true)}
                  >
                    My Cart
                    <span className="badge badge-dark">{data.length}</span>
                  </div>
                  {cartView ? (
                    <Model onClose={() => setCartView(false)}>
                      <Cart />
                    </Model>
                  ) : (
                    ""
                  )}
                  <div
                    className="btn bg-white text-danger mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
