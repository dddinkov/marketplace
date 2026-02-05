import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductAdd from "./pages/ProductAdd"
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./pages/Header";

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/add" element={<ProductAdd /> } />
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}