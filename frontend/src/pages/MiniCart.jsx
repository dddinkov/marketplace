import { useState, useEffect } from "react";
import { fetchCart } from "../api/cart";
import "../styles/MiniCart.css";
import { Link } from "react-router-dom";

export default function MiniCart() {
    const [itemCount, setItemCount] = useState(0);
    useEffect(() => {
        const loadCart = async () => {
            try {
                const data = await fetchCart();
                setItemCount(data.items.reduce((total, item) => total + item.quantity, 0));
            } catch (err) {
            }
        };

        loadCart();
    }, []);

    return (
        <Link to="/cart">
            <div className="mini-cart-container" style={{ position: "relative", display: "inline-block" }}>
                <img
                    src="https://static.thenounproject.com/png/cart-icon-3735038-512.png"
                    width="25px"
                    height="25px"
                >
                </img>
                {itemCount > 0 && (
                    <span>
                        {itemCount}
                    </span>
                )}
            </div>
        </Link>
    );
}