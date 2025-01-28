import { useState, FormEvent } from "react";
import styles from "./Contact.module.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ApiResponse {
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Namn är obligatoriskt";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-post är obligatoriskt";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ogiltig e-postadress";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Meddelande är obligatoriskt";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(
        "https://js2-ecommerce-api.vercel.app/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Något gick fel vid skickandet av meddelandet"
        );
      }

      setSubmitStatus({
        type: "success",
        message:
          "Tack för ditt meddelande! Vi återkommer så snart som möjligt.",
      });
      setFormData({ name: "", email: "", message: "" }); // Återställ formuläret
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus({
        type: "error",
        message: "Ett fel uppstod. Försök igen senare.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Kontakta oss</h1>
      {submitStatus.type === "success" ? (
        <div className={styles.successMessage}>
          <h2>Meddelande skickat!</h2>
          <p>{submitStatus.message}</p>
          <button
            className={styles.newMessageButton}
            onClick={() => setSubmitStatus({ type: null, message: "" })}
          >
            Skicka ett nytt meddelande
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Namn</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? styles.errorInput : ""}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-post</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Meddelande</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={errors.message ? styles.errorInput : ""}
              rows={5}
            />
            {errors.message && (
              <span className={styles.error}>{errors.message}</span>
            )}
          </div>

          {submitStatus.type === "error" && (
            <div className={styles.errorMessage}>{submitStatus.message}</div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Skickar..." : "Skicka meddelande"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;
