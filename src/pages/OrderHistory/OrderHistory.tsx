import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./OrderHistory.module.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface OrderProduct {
  quantity: number;
  product: Product;
  _id: string;
}

interface Order {
  _id: string;
  products: OrderProduct[];
  createdAt: string;
  totalPrice: number;
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Du måste vara inloggad för att se dina ordrar");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://js2-ecommerce-api.vercel.app/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Kunde inte hämta ordrar");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Kunde inte hämta dina ordrar");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, isAuthenticated, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const getTotalItems = (products: OrderProduct[]): number => {
    return products.reduce((sum, item) => sum + item.quantity, 0);
  };

  if (loading) {
    return <div className={styles.loading}>Laddar orderhistorik...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Orderhistorik</h1>
      {orders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>Du har inga tidigare ordrar</p>
        </div>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderId}>
                    Ordernummer: {order._id}
                  </span>
                  <span className={styles.orderDate}>
                    Datum: {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className={styles.orderSummary}>
                  <span>Antal produkter: {getTotalItems(order.products)}</span>
                  <span className={styles.totalPrice}>
                    Totalt: {formatPrice(order.totalPrice)}:-
                  </span>
                </div>
              </div>
              <div className={styles.productList}>
                {order.products.map((item) => (
                  <div key={item._id} className={styles.productItem}>
                    <div className={styles.productImageAndInfo}>
                      <div className={styles.productImage}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.productDetails}>
                        <span className={styles.productName}>
                          {item.product.name}
                        </span>
                        <span className={styles.productQuantity}>
                          Antal: {item.quantity} st
                        </span>
                      </div>
                    </div>
                    <span className={styles.productPrice}>
                      {formatPrice(item.product.price * item.quantity)}:-
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
