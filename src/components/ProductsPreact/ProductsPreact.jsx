import { useState, useEffect } from "preact/hooks";

const ProductsPreact = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("http://kirilltest1984online.ru/shop/get-products.php", {
          method: "GET",
          cache: "no-cache",
          headers: { "Accept": "application/json" }
        });
        if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div class="products-loading">Загрузка товаров...</div>;
  if (error) return <div class="products-error">Не удалось загрузить товары: {error}</div>;

  const filteredProducts = activeCategory === 0
    ? products
    : products.filter((product) => product.category_id === activeCategory);

  return (
    <>
      {/* 1. Кнопки навигации — лежат отдельно, в список не лезут, флексы не ломают */}
      <nav class="products-nav">
        <button 
          class={`products-nav__btn ${activeCategory === 0 ? "products-nav__btn--active" : ""}`}
          onClick={() => setActiveCategory(0)}
        >Все</button>
        <button 
          class={`products-nav__btn ${activeCategory === 1 ? "products-nav__btn--active" : ""}`}
          onClick={() => setActiveCategory(1)}
        >Электроника</button>
        <button 
          class={`products-nav__btn ${activeCategory === 2 ? "products-nav__btn--active" : ""}`}
          onClick={() => setActiveCategory(2)}
        >Одежда</button>
        <button 
          class={`products-nav__btn ${activeCategory === 3 ? "products-nav__btn--active" : ""}`}
          onClick={() => setActiveCategory(3)}
        >Бытовая техника</button>
        <button 
          class={`products-nav__btn ${activeCategory === 4 ? "products-nav__btn--active" : ""}`}
          onClick={() => setActiveCategory(4)}
        >Аксессуары</button>
      </nav>

      {/* 2. Твой список ul с нужным классом, куда рендерятся li карточек */}
      <ul class="products__list">
        {filteredProducts.map((product) => (
          <li class="products__item" key={product.id}>
            <article class="product-card">
              <div class="product-card__image-wrapper">
                <img
                  class="product-card__image"
                  src={`/src/assets/images/products/${product.image_url}`}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div class="product-card__content">
                <h3 class="product-card__title">{product.name}</h3>
                <p class="product-card__description">{product.description}</p>
                <div class="product-card__footer">
                  <span class="product-card__price">
                    {product.discount_price ? product.discount_price : product.price} ₽
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPreact;

