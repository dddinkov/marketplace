import ProductList from "./ProductList";
import MiniCart from "./MiniCart";
import "../styles/Home.css";

export default function Home() {
    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Available Products</h1>
            <ProductList />
        </div>
    );
}
