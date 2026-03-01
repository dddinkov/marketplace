import React from "react";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import "../styles/Header.css";

export default function Header() {
  return (
    <header>
      <h3>
        Marketplace
      </h3>
      <nav>
          <Link className="link" to="/">Home</Link>

          <Link className="link" to="/me">My Profile</Link>

          <Link className="link" to="/product/add">Add Product</Link>

          <Link className="link" to="/category/add">Add Category</Link>
      </nav>
      <div className="mini-cart-container">
        <MiniCart />
      </div>
    </header>
  );
}   