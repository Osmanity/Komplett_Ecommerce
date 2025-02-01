import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Categories.module.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

function Categories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("default");
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://js2-ecommerce-api.vercel.app/api/products"
        );
        const data = await response.json();
        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((p: Product) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = products

    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <h1 className={styles.title}>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
          </h1>
          <div className={styles.viewControls}>
            <div className={styles.sortSelect}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sortera efter</option>
                <option value="price-asc">Pris: Lägst först</option>
                <option value="price-desc">Pris: Högst först</option>
                <option value="name-asc">Namn: A-Ö</option>
                <option value="name-desc">Namn: Ö-A</option>
              </select>
            </div>
            <div className={styles.viewToggle}>
              <button
                className={viewMode === "grid" ? styles.active : ""}
                onClick={() => setViewMode("grid")}
              >
                ⊞
              </button>
              <button
                className={viewMode === "list" ? styles.active : ""}
                onClick={() => setViewMode("list")}
              >
                ≡
              </button>
            </div>
          </div>
        </div>

        <div className={styles.filterBar}>
          <button
            className={`${styles.categoryButton} ${
              selectedCategory === "all" ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedCategory("all");
              setSearchParams({});
            }}
          >
            Alla produkter
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSearchParams({ category: category });
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.productsGrid} ${styles[viewMode]}`}>
        {filteredProducts.map((product) => (
          <div className={styles.productWrapper} key={product._id}>
            <Link
              to={`/product/${product.name
                .toLowerCase()
                .replace(/\s+/g, "-")}-${product._id}`}
              className={styles.productLink}
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
                flexPrice={{
                  amount: Math.round(product.price / 12),
                  months: 12,
                }}
                stock="50+ st i lager (1-3 dagar leveranstid)"
                articleInfo={{
                  number: product._id,
                  productId: product.category,
                }}
                isKampanj={true}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
