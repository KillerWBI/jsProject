import { BLoadmore } from './handlers.js';
import { CategoryList, getIDProduct, getProducts } from './products-api.js';
import { getFromStorage } from './storage.js';

// Функція для створення та завантаження продуктів на головній сторінці
export function CreateHomeLoadProducts(page, Api = getProducts(page)) {
  const productsContainer = document.querySelector('.products');

  Api.then(data => {
    if (data && data.products) {
      data.products.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('products__item');
        li.dataset.id = product.id;

        li.innerHTML = `
    <img class="products__image" src="${product.images[0]}" alt=""/>
    <p class="products__title">${product.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${product.brand}</span></p>
    <p class="products__category">Category:${product.category} </p>
    <p class="products__price">Price:${product.price} $</p>
        `;
        productsContainer.appendChild(li);
      });
      BLoadmore(page, data);
    }
  });
}

export function CreateCategoryList(categoryList = CategoryList()) {
  const categoriesContainer = document.querySelector('.categories');
  if (!categoriesContainer) return;

  categoryList.then(data =>
    data.forEach(category => {
    const li = document.createElement('li');
    li.classList.add('categories__item');
    li.innerHTML = `<button class="categories__btn" type="button">${category}</button>`;
    categoriesContainer.appendChild(li);
  })
  );
}

export function removeFocusCategory() {
   document.querySelectorAll('.categories__btn--active').forEach(btn => {
    btn.classList.remove('categories__btn--active');
  });



}


export function CreateProductModal(productData) {
  const modalContent = document.querySelector('.modal-product');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <div class="modal-product" data-id="${productData.id}">
      <img class="modal-product__image" src="${productData.images[0]}" alt="${productData.title}" />
      <h2 class="modal-product__title">${productData.title}</h2>
      <p class="modal-product__brand">Brand: ${productData.brand}</p>
      <p class="modal-product__category">Category: ${productData.category}</p>
      <p class="modal-product__price">Price: ${productData.price} $</p>
      <p class="modal-product__description">${productData.description}</p>
    </div>
  `;
}

// Функция для рендеринга одного продукта
export function renderSingleProduct(product) {
  const productsContainer = document.querySelector('.products');
  const li = document.createElement('li');
  li.classList.add('products__item');
  li.dataset.id = product.id;

  li.innerHTML = `
    <img class="products__image" src="${product.images[0]}" alt=""/>
    <p class="products__title">${product.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${product.brand}</span></p>
    <p class="products__category">Category:${product.category} </p>
    <p class="products__price">Price:${product.price} $</p>
  `;

  productsContainer.appendChild(li);
}


export async function loadWishlistProducts(ProductContainer) {
  const productsContainer = document.querySelector('.products');
  productsContainer.innerHTML = ''; // Очищаем контейнер перед загрузкой
  const wishlist = getFromStorage(ProductContainer); // массив ID

  for (const id of wishlist) {
    const product = await getIDProduct(id); // жди каждый продукт отдельно

    if (product ) {
      renderSingleProduct(product);
    } else {
      console.warn(`Продукт с ID ${id} не загружен`);
    }
  }
}

export async function TotalListCount () {
  const cart = getFromStorage('cart');
  let PriceAllcart = 0;

for (const id of cart) {
const product = await getIDProduct(id);
if (product) {
  PriceAllcart += product.price;
}

}
  const cartCount = getFromStorage('cart').length;
 const ItemsSummary = document.querySelector('[data-count]');
  const cartSummary = document.querySelector('[data-price]');

  if (ItemsSummary) {
    ItemsSummary.textContent = cartCount;
  }
  if (cartSummary) {
    cartSummary.textContent = '$' + PriceAllcart.toFixed(2) ;
  }

}
