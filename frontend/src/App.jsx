import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductAdd from "./pages/ProductAdd"
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./pages/Header";
import MyProfile from "./pages/MyProfile.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

export const routes = [
    // public routes
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    // protected routes
    { path: "/me", element: <MyProfile />, protected: true },
    { path: "/", element: <Home />, protected: true },
    { path: "/cart", element: <Cart />, protected: true },
    { path: "/product/add", element: <ProductAdd />, protected: true },
];

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {routes.map(({ path, element, protected: isProtected }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            isProtected ? (
                                <ProtectedRoute>{element}</ProtectedRoute>
                            ) : (
                                element
                            )
                        }
                    />
                ))}
            </Routes>
        </Router>
    );
}