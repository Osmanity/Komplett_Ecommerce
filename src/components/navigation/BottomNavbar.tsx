import { Link } from "react-router-dom";
import "./BottomNavbar.css";
import { useCart } from "../../context/CartContext";

const BottomNavbar = () => {
  const { state } = useCart();
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-content">
        <Link to="/menu" className="bottom-nav-item">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7V9H28V7H4ZM4 15V17H28V15H4ZM4 23V25H28V23H4Z"
              fill="black"
            ></path>
          </svg>
          <span>Meny</span>
        </Link>

        <Link to="/search" className="bottom-nav-item">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3C13.4883 3 9 7.48828 9 13C9 15.3945 9.83984 17.5898 11.25 19.3125L3.28125 27.2812L4.71875 28.7188L12.6875 20.75C14.4102 22.1602 16.6055 23 19 23C24.5117 23 29 18.5117 29 13C29 7.48828 24.5117 3 19 3ZM19 5C23.4297 5 27 8.57031 27 13C27 17.4297 23.4297 21 19 21C14.5703 21 11 17.4297 11 13C11 8.57031 14.5703 5 19 5Z"
              fill="black"
            ></path>
          </svg>
          <span>Sök</span>
        </Link>

        <Link to="/login" className="bottom-nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
          >
            <path
              d="M16.5 3C11.8734 3 8.1 6.71626 8.1 11.2727C8.1 14.1211 9.57656 16.6509 11.8125 18.142C7.53281 19.9517 4.5 24.1342 4.5 29H6.9C6.9 23.7649 11.1844 19.5455 16.5 19.5455C21.8156 19.5455 26.1 23.7649 26.1 29H28.5C28.5 24.1342 25.4672 19.9517 21.1875 18.142C23.4234 16.6509 24.9 14.1211 24.9 11.2727C24.9 6.71626 21.1266 3 16.5 3ZM16.5 5.36364C19.8281 5.36364 22.5 7.99503 22.5 11.2727C22.5 14.5504 19.8281 17.1818 16.5 17.1818C13.1719 17.1818 10.5 14.5504 10.5 11.2727C10.5 7.99503 13.1719 5.36364 16.5 5.36364Z"
              fill="black"
            ></path>
          </svg>
          <span>Logga in</span>
        </Link>

        <Link to="/favorites" className="bottom-nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M9.58707 4C8.38943 4 7.40229 4.98714 7.40229 6.18478C7.40229 6.44081 7.45634 6.68262 7.53884 6.91304H3.76099V11.2826H4.48925V20.75H20.511V11.2826H21.2392V6.91304H17.4614C17.5439 6.68262 17.5979 6.44081 17.5979 6.18478C17.5979 4.98714 16.6108 4 15.4132 4C14.1387 4 13.2739 4.96722 12.7049 5.77514C12.6281 5.88324 12.5684 5.98849 12.5001 6.09375C12.4318 5.98849 12.3721 5.88324 12.2953 5.77514C11.7263 4.96722 10.8615 4 9.58707 4ZM9.58707 5.45652C10.0422 5.45652 10.6339 5.94582 11.0891 6.59443C11.2001 6.75374 11.183 6.76227 11.2712 6.91304H9.58707C9.17458 6.91304 8.85881 6.59727 8.85881 6.18478C8.85881 5.77229 9.17458 5.45652 9.58707 5.45652ZM15.4132 5.45652C15.8257 5.45652 16.1414 5.77229 16.1414 6.18478C16.1414 6.59727 15.8257 6.91304 15.4132 6.91304H13.7291C13.8172 6.76227 13.8002 6.75374 13.9111 6.59443C14.3663 5.94582 14.958 5.45652 15.4132 5.45652ZM5.21751 8.36957H19.7827V9.82609H13.2284H11.7719H5.21751V8.36957ZM5.94577 11.2826H19.0545V19.2935H13.2284H11.7719H5.94577V11.2826Z"
              fill="black"
            ></path>
          </svg>
          <span>Förmåner</span>
        </Link>

        <Link to="/checkout" className="bottom-nav-item">
          <div className="cart-icon-wrapper">
            {state.totalItems > 0 && (
              <span className="bottom-cart-badge">{state.totalItems}</span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
            >
              <path
                d="M17 2.5C14.2694 2.5 12.0282 4.75391 12.0282 7.5V8.5H7.11864L7.0565 9.4375L6.06215 27.4375L6 28.5H28L27.9379 27.4375L26.9435 9.4375L26.8814 8.5H21.9718V7.5C21.9718 4.75391 19.7306 2.5 17 2.5ZM17 4.5C18.6469 4.5 19.9831 5.84375 19.9831 7.5V8.5H14.0169V7.5C14.0169 5.84375 15.3531 4.5 17 4.5ZM8.98305 10.5H12.0282V13.5H14.0169V10.5H19.9831V13.5H21.9718V10.5H25.0169L25.887 26.5H8.11299L8.98305 10.5Z"
                fill="black"
              ></path>
            </svg>
          </div>
          <span>
            {state.totalItems > 0
              ? `${formatPrice(state.totalPrice)},00`
              : "Kundkorg"}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar;
