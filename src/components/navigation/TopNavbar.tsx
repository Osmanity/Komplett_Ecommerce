import { Link } from "react-router-dom";
import "./TopNavbar.css";

const TopNavbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <img
            src="https://www.komplett.se/logo/312/logo_b2c.svg"
            alt="Komplett Logo"
            className="logo"
          />
        </Link>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <button className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Sök bland 10 000 produkter"
            className="search-input"
          />
        </div>
      </div>

      <div className="nav-right">
        <Link to="/register" className="nav-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
          >
            <path
              d="M12.7857 3C9.20564 3 6.28571 5.91992 6.28571 9.5C6.28571 11.738 7.42829 13.7257 9.15848 14.8973C5.84682 16.3192 3.5 19.6055 3.5 23.4286H5.35714C5.35714 19.3153 8.67243 16 12.7857 16C14.0625 16 15.2522 16.3337 16.2969 16.8996C15.2667 18.1763 14.6429 19.8086 14.6429 21.5714C14.6429 25.6629 17.9799 29 22.0714 29C26.1629 29 29.5 25.6629 29.5 21.5714C29.5 17.4799 26.1629 14.1429 22.0714 14.1429C20.4501 14.1429 18.9411 14.6761 17.7188 15.5647C17.3089 15.3072 16.8627 15.0896 16.4129 14.8973C18.1431 13.7257 19.2857 11.738 19.2857 9.5C19.2857 5.91992 16.3658 3 12.7857 3ZM12.7857 4.85714C15.361 4.85714 17.4286 6.92467 17.4286 9.5C17.4286 12.0753 15.361 14.1429 12.7857 14.1429C10.2104 14.1429 8.14286 12.0753 8.14286 9.5C8.14286 6.92467 10.2104 4.85714 12.7857 4.85714ZM22.0714 16C25.1582 16 27.6429 18.4847 27.6429 21.5714C27.6429 24.6582 25.1582 27.1429 22.0714 27.1429C18.9847 27.1429 16.5 24.6582 16.5 21.5714C16.5 18.4847 18.9847 16 22.0714 16ZM21.1429 17.8571V20.6429H18.3571V22.5H21.1429V25.2857H23V22.5H25.7857V20.6429H23V17.8571H21.1429Z"
              fill="black"
            ></path>
          </svg>
          <span className="nav-button-text">Bli kund</span>
        </Link>
        <Link to="/login" className="nav-button">
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
          <span className="nav-button-text">Logga in</span>
        </Link>
        <Link to="/cart" className="nav-button">
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
          <span className="nav-button-text">(PRIS)</span>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
