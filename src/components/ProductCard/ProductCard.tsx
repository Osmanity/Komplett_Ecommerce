import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  title: string;
  image: string;
  image2: string;
  specs: string[];
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  savings: number;
  flexPrice?: {
    amount: number;
    months: number;
  };
  stock: string;
  articleInfo: {
    number: string;
    productId: string;
  };
  isKampanj?: boolean;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function ProductCard({
  title,
  image,
  image2,
  specs,
  rating,
  reviewCount,
  price,
  originalPrice,
  savings,
  flexPrice,
  stock,
  articleInfo,
  isKampanj = false,
}: ProductCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <FaStar key={i} className={`${styles.star} ${styles.filled}`} />
        );
      } else if (i - 0.5 === roundedRating) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className={`${styles.star} ${styles.filled}`}
          />
        );
      } else {
        stars.push(
          <FaRegStar key={i} className={`${styles.star} ${styles.empty}`} />
        );
      }
    }
    return stars;
  };

  return (
    <div className={styles.card}>
      {isKampanj && <div className={styles.kampanjBadge}>KAMPANJ</div>}

      <div className={styles.productContent}>
        <div className={styles.imageContainer}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={styles.image1}
          />
          <img
            src={image2}
            alt={title}
            loading="lazy"
            className={styles.image2}
          />
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.title}>{title}</h3>

          <div className={styles.specs}>
            {specs.map((spec, index) => (
              <span key={index}>{spec}</span>
            ))}
          </div>

          <div className={styles.rating}>
            <div className={styles.stars}>{renderStars(rating)}</div>
            <span>({reviewCount} recensioner)</span>
          </div>

          <div className={styles.pricing}>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{formatPrice(price)}:-</span>
              <div className={styles.priceInfo}>
                {savings > 0 && (
                  <div className={styles.savings}>
                    Spara {formatPrice(savings)}:-
                  </div>
                )}
                <div className={styles.originalPrice}>
                  Ord. pris{" "}
                  <span className={styles.originalPriceValue}>
                    {formatPrice(originalPrice)}:-
                  </span>
                </div>
              </div>
            </div>
            {flexPrice && (
              <div className={styles.flex}>
                FLEX {formatPrice(flexPrice.amount)}:-/mån.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottomInfo}>
        <div className={styles.stock}>
          <div className={styles.stockIndicator} />
          <span>{stock}</span>
        </div>

        <div className={styles.articleInfo}>
          Art. nr: {articleInfo.number} / Prodnr: {articleInfo.productId}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
