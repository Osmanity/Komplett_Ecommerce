import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      toast.error("Vänligen ange en giltig e-postadress");
      return;
    }

    try {
      const response = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/auth/login",
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
      toast.success("Inloggningen lyckades!");
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
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGroup}>
          <label>E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              error && error.includes("e-post") ? styles.errorInput : ""
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              error && error.includes("lösenord") ? styles.errorInput : ""
            }
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Logga in
        </button>
        <div className={styles.authLinks}>
          <p>
            Har du inget konto?{" "}
            <Link to="/register" className={styles.link}>
              Registrera dig här
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
