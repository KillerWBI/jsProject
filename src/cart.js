import { getIDProduct } from './js/products-api.js';
import { CreateProductModal, loadWishlistProducts, TotalListCount } from './js/render-function.js';
import { AddLocalStorageSet, countLocalStorage, removeFromStorage, shearId } from './js/storage.js';
//Логіка сторінки Cart
let IdProduct = '';
const product = document.querySelector('.products');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close-btn');
const BtnContainerLike = document.querySelector('.modal-product__actions');
const ItemsSummary = document.querySelector('[data-count]');
const cartSummary = document.querySelector('[data-price]');

addEventListener('DOMContentLoaded', async () => {
  loadWishlistProducts('cart');
  countLocalStorage('wishlist');
    countLocalStorage('cart');
    await TotalListCount();
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

BtnContainerLike.addEventListener('click', async (event) => {

  if (event.target.textContent.trim() === 'Add to Wishlist') {
    event.target.textContent = 'Remove from Wishlist';
    event.target.classList.remove('modal-product__btn--wishlist');
    AddLocalStorageSet('wishlist', IdProduct);

  } else if(event.target.textContent.trim() === 'Remove from Wishlist') {
    event.target.textContent = 'Add to Wishlist';
    event.target.classList.add('modal-product__btn--wishlist');
    removeFromStorage('wishlist', IdProduct)

  } else if(event.target.textContent.trim() === 'Add to Cart') {
    event.target.textContent = 'Remove from Cart';
    event.target.classList.remove('modal-product__btn--cart');
    AddLocalStorageSet('cart', IdProduct);
    loadWishlistProducts('cart');

  } else if(event.target.textContent.trim() === 'Remove from Cart') {
    event.target.textContent = 'Add to Cart';
    event.target.classList.add('modal-product__btn--cart');
    removeFromStorage('cart', IdProduct)
    loadWishlistProducts('cart');

  }
 TotalListCount();

});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.remove('modal--is-open');
});
