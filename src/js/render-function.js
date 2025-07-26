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
