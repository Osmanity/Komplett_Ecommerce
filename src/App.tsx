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

function App() {
  return (
    <CartProvider>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
