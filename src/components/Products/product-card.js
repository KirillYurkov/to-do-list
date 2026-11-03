const getProducts = async () => {
  let productList = document.querySelector(".products__list");
  console.log(productList);
  let products = [];
  try {
    let response = await fetch(
      "http://kirilltest1984online.ru/shop/get-products.php",
    );
    if (!response.ok) {
      throw new Error("Ошибка получения данных из БД");
    }
    products = await response.json();
    console.log(products);
  } catch (error) {
    console.log(error);
  }

  if (products.length < 1) {
    productList.insertAdjacentHTML(
      "beforeend",
      `
        <li class="products__item">
        Данных не найдено
        </li>
        `,
    );
    return;
  }

  products.forEach((product) => {
    let hasImage = product.image_url && product.image_url;
    let Image = "";
    if (hasImage) {
      Image = `
         <img class='product-card__img--empty'
        alt="${product.name}"
        src="/products/${product.image_url}"
        loading="lazy"
        decoding="async"
        width=${300}
        />
        `;
    } else {
      Image = "<div class='product-card__img--empty'>Картинки нет</div>";
    }
    let card = `
    <li class='product-card__item'>
        <article class="product-card">
      ${Image}
        <h3 class="product-card__name">${product.name}</h3>
        <span class="product-card__desc">${product.description}</span>
        <span class="product-card__price">Цена: ${product.price}</span>
        <span class="product-card__price--discount">Цена со скидкой: ${product.discount_price}
        </span>
        <span class="product-card__quantity">В наличии: ${product.quantity}
        </span>
 </article>
 </li>
        `;
    productList.insertAdjacentHTML("beforeend", card);
  });
};

getProducts();
