import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { state, removeItem, addItem, clearCart } = useCart();

  const handleIncreaseQuantity = (item: {
    _id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem(item);
  };

  const handleDecreaseQuantity = (id: string) => {
    removeItem(id);
  };

  const handleRemoveProduct = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
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
    <div className="checkout-container">
      <h1>Din varukorg</h1>

      <div className="checkout-content">
        <div className="cart-items">
          {state.items.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{item.price}:-</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncreaseQuantity({
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveProduct(item._id)}
                  className="remove-btn"
                >
                  Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h2>Sammanfattning</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Antal varor:</span>
              <span>{state.totalItems}</span>
            </div>
            <div className="summary-row total">
              <span>Totalt:</span>
              <span>{state.totalPrice}:-</span>
            </div>
          </div>

          <div className="checkout-actions">
            <button className="checkout-btn">Genomför köp</button>
            <button onClick={handleClearCart} className="clear-cart-btn">
              Rensa varukorg
            </button>
            <Link to="/" className="continue-shopping">
              Fortsätt handla
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
