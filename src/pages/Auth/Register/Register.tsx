import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const { setToken, setUserDetails } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Vänligen ange ditt namn");
      return false;
    }
    if (!address.trim()) {
      toast.error("Vänligen ange din adress");
      return false;
    }
    if (!postalCode.trim()) {
      toast.error("Vänligen ange ditt postnummer");
      return false;
    }
    if (!city.trim()) {
      toast.error("Vänligen ange din stad");
      return false;
    }
    if (!phoneNumber.trim()) {
      toast.error("Vänligen ange ditt telefonnummer");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      toast.error("Vänligen ange en giltig e-postadress");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Lösenorden matchar inte");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Något gick fel");
      }

      setToken(data.token);

      setUserDetails({
        name,
        address,
        postalCode,
        city,
        phoneNumber,
      });

      toast.success("Registreringen lyckades!");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Något gick fel";
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registrera konto</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label>Namn</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Adress</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Postnummer</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Ort</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Telefonnummer</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bekräfta lösenord</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Registrera
        </button>

        <div className={styles.authLinks}>
          <p>
            Har du redan ett konto?{" "}
            <Link to="/login" className={styles.link}>
              Logga in här
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
