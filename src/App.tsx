import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import { CartProvider } from "./context/CartContext";
import Contact from "./pages/Contact/Contact";
import FAQ from "./pages/FAQ/FAQ";
import Returns from "./pages/Returns/Returns";
import AboutCompany from "./pages/AboutCompany/AboutCompany";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import Categories from "./pages/Categories/Categories";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 6000,
            style: {
              background: "#fff",
              color: "#333",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            },
            success: {
              iconTheme: {
                primary: "#f8b912",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#e00",
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="vanliga-fragor" element={<FAQ />} />
            <Route path="returer" element={<Returns />} />
            <Route path="om-oss" element={<AboutCompany />} />
            <Route path="villkor" element={<Terms />} />
            <Route path="integritet" element={<Privacy />} />
            <Route path="categories" element={<Categories />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
