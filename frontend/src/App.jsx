import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductAdd from "./pages/ProductAdd.jsx"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/add" element={<ProductAdd /> } />
            </Routes>
        </Router>
    );
}