import React from "react";
import { Link } from "react-router-dom";
import MiniCart from "./MiniCart";
import "../styles/Header.css";

export default function Header({ cartItemCount = 0 }) {
  return (
    <header>
      <div>
        Marketplace
      </div>
      <nav>
        <Link className="link" to="/">Home</Link>
        
        <Link className="link" to="/me">My Profile</Link>

          <Link className="link" to="/product/add">Add Product</Link>
      </nav>
      <div className="mini-cart-container">
        <MiniCart />
      </div>
    </header>
  );
}   