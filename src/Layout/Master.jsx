import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";

export default function Master(props) {
  const ctx = useContext(CartContext);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link " to="/">
              <p className="text-white"> Home</p>
            </Link>
            <Link className="nav-item nav-link" to="/about">
              <p className="text-white">About</p>
            </Link>
            <Link className="nav-item nav-link" to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <span className="badge badge-danger">{ctx.cart.length}</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mt-3">{props.children}</div>
    </React.Fragment>
  );
}
