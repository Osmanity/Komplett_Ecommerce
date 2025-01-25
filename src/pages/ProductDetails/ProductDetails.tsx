import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = id?.split("-").pop();
        if (!productId) {
          throw new Error("Invalid product ID");
        }

        const response = await fetch(
          `https://js2-ecommerce-api.vercel.app/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const [showFullText, setShowFullText] = useState(false);
  const words = product?.description.split(" ");

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product!.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product!.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailScroll = (direction: "left" | "right") => {
    if (thumbnailRef.current) {
      const scrollAmount = thumbnailRef.current.clientWidth;
      thumbnailRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.productImages}>
        <div className={styles.mainImage}>
          <button onClick={handlePrevImage} className={styles.navButton}>
            ‹
          </button>
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.name} - ${currentImageIndex + 1}`}
          />
          <button onClick={handleNextImage} className={styles.navButton}>
            ›
          </button>
        </div>
        <div className={styles.thumbnailContainer}>
          <button
            className={styles.scrollButton}
            onClick={() => handleThumbnailScroll("left")}
          >
            ‹
          </button>
          <div className={styles.thumbnails} ref={thumbnailRef}>
            {product.images
              .slice(0, window.innerWidth <= 768 ? 3 : product.images.length)
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={
                    currentImageIndex === index ? styles.activeThumbnail : ""
                  }
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
          </div>
          <button
            className={styles.scrollButton}
            onClick={() => handleThumbnailScroll("right")}
          >
            ›
          </button>
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.kampanjBadge}>KAMPANJ</div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>
          {showFullText || (words && words.length <= 20)
            ? product?.description
            : `${words?.slice(0, 20).join(" ")}...`}
          {words && words.length > 20 && (
            <span className={styles.readMore} onClick={toggleText}>
              {" "}
              {showFullText ? "Visa mindre" : "Läs mer"}
            </span>
          )}
        </p>
        <div className={styles.pricing}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{formatPrice(product.price)}:-</span>
            <div className={styles.priceInfo}>
              {Math.round(product.price * 0.2) > 0 && (
                <div className={styles.savings}>
                  Spara {formatPrice(Math.round(product.price * 0.2))}:-
                </div>
              )}
              <div className={styles.originalPrice}>
                Ord. pris{" "}
                <span className={styles.originalPriceValue}>
                  {formatPrice(Math.round(product.price * 1.2))}:-
                </span>
              </div>
            </div>
          </div>
        </div>

        <p>Vi rekommenderar:</p>
        <div className={styles.recommendations}>
          {[
            {
              id: 1,
              name: "Supportavtal 1 år",
              price: 699,
              image: "https://www.komplett.se/img/p/200/200775.jpg",
            },
          ].map((item) => (
            <div className={styles.recommendationItem} key={item.id}>
              <div className={styles.recommendationItemContainer}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.recommendationImage}
                />{" "}
                <span className={styles.recommendationTitle}>{item.name}</span>
                <span className={styles.recommendationPrice}>
                  {item.price}:-
                </span>
              </div>
              <button className={styles.recommendationButton}>Lägg till</button>
            </div>
          ))}
        </div>
        <div className={styles.bottomInfo}>
          <div className={styles.stock}>
            <div className={styles.stockIndicator} />
            <span>{"50+ st i lager (1-3 dagar leveranstid)"}</span>
          </div>

          <div className={styles.articleInfo}>
            Art. nr: {product._id} / Prodnr: {product.category}
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <button className={styles.addToCartButton}>LÄGG I KUNDVAGN</button>
          <div className={styles.separator}>
            <span className={styles.separatorText}>eller</span>
          </div>
          <button className={styles.flexButton}>
            FLEX {formatPrice(Math.round(product.price / 12))}:-/mån.
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
