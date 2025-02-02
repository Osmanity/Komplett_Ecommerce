import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { state, removeItem, addItem, clearCart, decreaseQuantity } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (item: {
    _id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem(item);
  };

  const handleDecreaseQuantity = (id: string) => {
    decreaseQuantity(id);
  };

  const handleRemoveProduct = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.error("Du måste vara inloggad för att genomföra ett köp");
      navigate("/login");
      return;
    }

    try {
      const orderData = {
        products: state.items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Något gick fel vid köpet");
      }

      toast.success("Köpet genomfördes!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Något gick fel vid köpet. Försök igen senare.");
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Din varukorg är tom</h2>
        <Link to="/" className="continue-shopping">
          Fortsätt handla
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Din varukorg</h1>

      <div className="checkout__layout">
        <div className="shopping-cart">
          {state.items.map((item) => (
            <div key={item._id} className="product-card">
              <div className="product-image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="price">{formatPrice(item.price)}.00:-</p>

                <div className="counter">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    className="number-btn"
                  >
                    -
                  </button>
                  <span className="count">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncreaseQuantity({
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="number-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveProduct(item._id)}
                  className="delete-btn"
                >
                  Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h2>Sammanfattning</h2>
          <div className="summary__content">
            <div className="summary__row">
              <span>Antal varor:</span>
              <span>{state.totalItems}</span>
            </div>
            <div className="summary__row summary__row--total">
              <span>Totalt:</span>
              <span>{formatPrice(state.totalPrice)},00:-</span>
            </div>
          </div>

          <div className="summary__actions">
            <button className="btn btn--primary" onClick={handlePurchase}>
              Genomför köp!
            </button>
            <button onClick={handleClearCart} className="btn btn--danger">
              Rensa varukorg
            </button>
            <Link to="/" className="btn btn--link">
              Fortsätt handla
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
