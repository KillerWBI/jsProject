import { BLoadmore } from './handlers.js';
import { CategoryList, getProducts } from './products-api.js';

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
    <div class="modal-product">
      <img class="modal-product__image" src="${productData.images[0]}" alt="${productData.title}" />
      <h2 class="modal-product__title">${productData.title}</h2>
      <p class="modal-product__brand">Brand: ${productData.brand}</p>
      <p class="modal-product__category">Category: ${productData.category}</p>
      <p class="modal-product__price">Price: ${productData.price} $</p>
      <p class="modal-product__description">${productData.description}</p>
    </div>
  `;
}
