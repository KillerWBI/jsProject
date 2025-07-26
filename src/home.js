import { CategoryList, getProducts, getProductsFromCategory } from './js/products-api.js';
import { CreateCategoryList, CreateHomeLoadProducts } from './js/render-function';
let page = 1;
const loadMoreBtn = document.querySelector('.load-more-btn');
const categoriesContainer = document.querySelector('.categories');
let activeCategory = null;
// Функція для завантаження продуктів при завантаженні сторінки
addEventListener('DOMContentLoaded', () => {
  CreateHomeLoadProducts(page, getProducts(page));
  CreateCategoryList(CategoryList());
});

 loadMoreBtn.addEventListener('click', () => {
    page++;
    if(activeCategory === null) {
      CreateHomeLoadProducts(page, getProducts(page));
    } else {
      CreateHomeLoadProducts(page, getProductsFromCategory(activeCategory, page));
    }
  });

// Обробник події для кнопок категорій
  categoriesContainer.addEventListener('click',  (event) => {
  if (event.target.classList.contains('categories__btn')) {
    const category = event.target.textContent;
    activeCategory = category; // Зберігаємо активну категорію
    page = 1; // Сброс страницы
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Очистка

    CreateHomeLoadProducts(page, getProductsFromCategory(category  ,page = 1));
  }
});


