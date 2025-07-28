import { CategoryList, getIDProduct, getProducts, getProductSearch, getProductsFromCategory } from './js/products-api.js';
import { CreateCategoryList, CreateHomeLoadProducts, CreateProductModal, removeFocusCategory } from './js/render-function';
import { AddLocalStorageSet, countLocalStorage, getFromStorage, removeFromStorage, shearId } from './js/storage.js';
let page = 1;
const loadMoreBtn = document.querySelector('.load-more-btn');
const categoriesContainer = document.querySelector('.categories');
let activeCategory = null;
const form = document.querySelector('.search-form');
const cleaninput = document.querySelector('.search-form__btn-clear');
const modal = document.querySelector('.modal');
const Btnlike = document.querySelector('.modal-product__btn');
const BtnContainerLike = document.querySelector('.modal-product__actions');
const product = document.querySelector('.products');
const modalCloseBtn = document.querySelector('.modal__close-btn');
let IdProduct = '';
addEventListener('DOMContentLoaded', () => {
  CreateHomeLoadProducts(page, getProducts(page));
  CreateCategoryList(CategoryList());
  countLocalStorage('wishlist');
  countLocalStorage('cart');
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
    removeFocusCategory();
  if (event.target.classList.contains('categories__btn')) {
    const category = event.target.textContent;
    activeCategory = category; // Зберігаємо активну категорію
    page = 1; // Сброс страницы
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Очистка

    if (event.target.classList.contains('categories__btn--active')) {
      event.target.classList.remove('categories__btn--active'); // Видаляємо клас активної категорії
      activeCategory = null; // Скидаємо активну категорію
      CreateHomeLoadProducts(page, getProducts(page)); // Завантажуємо всі продукти
      return;
    }

    if (event.target.textContent === 'ALL') {
      activeCategory = null; //
      CreateHomeLoadProducts(page, getProducts(page));
    }
    event.target.classList.add('categories__btn--active'); // Додаємо клас активної категорії

    CreateHomeLoadProducts(page, getProductsFromCategory(category  ,page = 1));
  }
});


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const productsContainer = document.querySelector('.products');
  productsContainer.innerHTML = ''; // Очистка
  const searchQuery = document.querySelector('.search-form__input').value.trim();
  CreateHomeLoadProducts(page, getProductSearch(searchQuery, page));
  removeFocusCategory();
  activeCategory = null;
});
cleaninput.addEventListener('click', () => {
  const input = document.querySelector('.search-form__input');
  input.value = '';
  const productsContainer = document.querySelector('.products');
  productsContainer.innerHTML = ''; // Очистка
  CreateHomeLoadProducts(page, getProducts(page));
  removeFocusCategory();
  activeCategory = null;
});



product.addEventListener('click', async (event) => {
  const item = event.target.closest('.products__item');
  if (!item) return;
  const productId = item.dataset.id;
  IdProduct = productId; // Сохраняем ID продукта для дальнейшего использования

  try {
    const productData = await getIDProduct(productId);
    CreateProductModal(productData); // вставляем HTML
    modal.classList.add('modal--is-open');

    // Получаем кнопки после вставки HTML
    const wishlistBtn = document.querySelector('[data-btn="wishlist"]');
    const cartBtn = document.querySelector('[data-btn="cart"]');

    if (wishlistBtn && shearId('wishlist', IdProduct)) {
      wishlistBtn.textContent = 'Remove from Wishlist';
      wishlistBtn.classList.remove('modal-product__btn--wishlist');
    }else {
      wishlistBtn.textContent = 'Add to Wishlist';
      wishlistBtn.classList.add('modal-product__btn--wishlist');
    }

    if (cartBtn && shearId('cart', IdProduct)) {
      cartBtn.textContent = 'Remove from Cart';
      cartBtn.classList.remove('modal-product__btn--cart');
    } else {
      cartBtn.textContent = 'Add to Cart';
      cartBtn.classList.add('modal-product__btn--cart');
    }

  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
  }
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('modal--is-open');
});

BtnContainerLike.addEventListener('click', (event) => {

  if (event.target.textContent.trim() === 'Add to Wishlist') {
    event.target.textContent = 'Remove from Wishlist';
    event.target.classList.remove('modal-product__btn--wishlist');
    AddLocalStorageSet('wishlist', IdProduct);
    console.log(getFromStorage('wishlist'));
  } else if(event.target.textContent.trim() === 'Remove from Wishlist') {
    event.target.textContent = 'Add to Wishlist';
    event.target.classList.add('modal-product__btn--wishlist');
    removeFromStorage('wishlist', IdProduct)
    console.log(getFromStorage('wishlist'));
  } else if(event.target.textContent.trim() === 'Add to Cart') {
    event.target.textContent = 'Remove from Cart';
    event.target.classList.remove('modal-product__btn--cart');
    AddLocalStorageSet('cart', IdProduct);
    console.log(getFromStorage('cart'));
  } else if(event.target.textContent.trim() === 'Remove from Cart') {
    event.target.textContent = 'Add to Cart';
    event.target.classList.add('modal-product__btn--cart');
    removeFromStorage('cart', IdProduct)
    console.log(getFromStorage('cart'));
  }


});

