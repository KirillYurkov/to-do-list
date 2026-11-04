import { activeCategory } from "./categoryStore.js";

export default function ProductsNav() {
  return (
    <nav class="products-nav">
      <button 
        class={`products-nav__btn ${activeCategory.value === 0 ? "products-nav__btn--active" : ""}`}
        onClick={() => activeCategory.value = 0}
      >Все</button>
      <button 
        class={`products-nav__btn ${activeCategory.value === 1 ? "products-nav__btn--active" : ""}`}
        onClick={() => activeCategory.value = 1}
      >Электроника</button>
      <button 
        class={`products-nav__btn ${activeCategory.value === 2 ? "products-nav__btn--active" : ""}`}
        onClick={() => activeCategory.value = 2}
      >Одежда</button>
      <button 
        class={`products-nav__btn ${activeCategory.value === 3 ? "products-nav__btn--active" : ""}`}
        onClick={() => activeCategory.value = 3}
      >Бытовая техника</button>
      <button 
        class={`products-nav__btn ${activeCategory.value === 4 ? "products-nav__btn--active" : ""}`}
        onClick={() => activeCategory.value = 4}
      >Аксессуары</button>
    </nav>
  );
}
