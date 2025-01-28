import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Kundservice</h4>
          <ul>
            <li>
              <Link to="/contact">Kontakta oss</Link>
            </li>
            <li>
              <Link to="/vanliga-fragor">Vanliga frågor</Link>
            </li>
            <li>
              <Link to="/returer">Returer</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Om oss</h4>
          <ul>
            <li>
              <Link to="/om-oss">Om företaget</Link>
            </li>
            <li>
              <Link to="/villkor">Köpvillkor</Link>
            </li>
            <li>
              <Link to="/integritet">Integritetspolicy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Följ oss</h4>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/komplettse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/Komplettse/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/user/komplettse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Youtube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Komplett.se</p>
      </div>
    </footer>
  );
}

export default Footer;
