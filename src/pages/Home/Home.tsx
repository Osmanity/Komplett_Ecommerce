import styles from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://js2-ecommerce-api.vercel.app/api/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const renderProductGroup = (startIndex: number, groupSize: number) => {
    return products.slice(startIndex, startIndex + groupSize).map((product) => (
      <div style={{ width: "20%", padding: "0 10px" }} key={product._id}>
        <Link
          to={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}-${
            product._id
          }`}
          style={{
            textDecoration: "none",
            display: "block",
            width: "100%",
            color: "inherit",
          }}
        >
          <ProductCard
            title={product.name}
            image={product.images[0]}
            image2={product.images[1] || product.images[0]}
            specs={[product.name]}
            rating={5}
            reviewCount={1}
            price={product.price}
            originalPrice={Math.round(product.price * 1.2)}
            savings={Math.round(product.price * 0.2)}
            flexPrice={{ amount: Math.round(product.price / 12), months: 12 }}
            stock="50+ st i lager (1-3 dagar leveranstid)"
            articleInfo={{
              number: product._id,
              productId: product.category,
            }}
            isKampanj={true}
          />
        </Link>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.campaignHero}>
        <img
          alt="Helt Galna Priser"
          className={styles.mainImage}
          loading="lazy"
          title="Helt Galna Priser"
          src="https://www.komplett.se/marketingmedia/161147/k_lowprices_q424_pt1_motherbrd_se.jpg"
        />
        <img
          alt="Månadens gaming deals"
          className={styles.secondaryImage}
          loading="lazy"
          title="Månadens gaming deals"
          src="https://www.komplett.se/marketingmedia/153652/k_mgd_q324_gamerlivingroom_amd_servicebrd_se.jpg"
        />
      </div>

      <div className={styles.categoryGrid}>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161008/k_cat_q424_hwgaming_btn_winter_se.png"
            alt="Datorutrustning & gaming"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161010/k_cat_q424_mobwatch_btn_winter_se.png"
            alt="Mobil & klockor"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161005/k_cat_q424_tv_btn_winter_se.png"
            alt="TV"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161007/k_cat_q424_homeleisure_btn_winter_se.png"
            alt="Hem & skönhet"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161009/k_cat_q424_kpc_btn_winter_se.png"
            alt="Komplett-PC"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161003/k_cat_q424_pctabs_btn_winter_se.png"
            alt="Datorer & surfplattor"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161004/k_cat_q424_sound_btn_winter_se.png"
            alt="Ljud"
            loading="lazy"
          />
        </div>
        <div className={styles.categoryItem}>
          <img
            src="https://www.komplett.se/marketingmedia/161006/k_cat_q424_whitegoods_btn_winter_se.png"
            alt="Vitvaror"
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.blackTitleDivider}>
        <span>Månadens Gamingdeals {">"}</span>
      </div>
      <div className={styles.productsWrapper}>
        <div className={styles.productContainer}>
          {renderProductGroup(0, 5)}
        </div>
      </div>
      <div className={styles.advertisementBannerContainer}>
        <img
          className={styles.advertisementBanner}
          src="https://www.komplett.se/marketingmedia/161207/50-series-family_stripe_1728x120-svse.jpg"
          alt="Reklam"
          loading="lazy"
        />
      </div>
      {products.length > 5 && (
        <>
          <div className={styles.yellowTitleDivider}>
            <span>Veckans fynd {">"}</span>
          </div>
          <div className={styles.productsWrapper}>
            <div className={styles.productContainer}>
              {renderProductGroup(5, 5)}
            </div>
          </div>
        </>
      )}

      {products.length > 10 && (
        <>
          <div className={styles.yellowTitleDivider}>
            <span>Bästsäljare {">"}</span>
          </div>
          <div className={styles.productsWrapper}>
            <div className={styles.productContainer}>
              {renderProductGroup(10, 5)}
            </div>
          </div>
        </>
      )}

      {/* <div style={{ marginBottom: "600px" }}></div> */}
    </div>
  );
}

export default Home;
