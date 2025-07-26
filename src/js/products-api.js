import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

import iziToast from 'izitoast';


// Функції для отримання продуктів з API
export async function getProducts(page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        limit: 12,
        skip: (page - 1) * 12,
      }
    });
    return response.data;
  } catch (error) {
    iziToast.error({
        title: 'error',
        message: `Помилка при завантаженні зображень:, ${error.message}`,
        timeout: 3000,
        position: 'topRight',
      });
    return null;
  }
}
// Функція для отримання продукту за ID
export async function getIDProduct(id) {
  try {
    const response = await axios.get(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    iziToast.error({
        title: 'error',
        message: `Помилка при завантаженні зображень:, ${error.message}`,
        timeout: 3000,
        position: 'topRight',
      });
    return null;
  }
}
// пошук продукту по ключовому слову
export async function getProductSearch(q, page = 1) {
  try {
    const response = await axios.get(BASE_URL + '/search', {
      params: {
        q: q,
        limit: 12,
        skip: (page - 1) * 12,
      }
    });
    return response.data;
  } catch (error) {
    iziToast.error({
        title: 'error',
        message: `Помилка при завантаженні зображень:, ${error.message}`,
        timeout: 3000,
        position: 'topRight',
      });
    return null;
  }
}
//отримати список категорій продуктів
export async function CategoryList() {
  try {
    const response = await axios.get(BASE_URL + '/category-list');
    return response.data;
  } catch (error) {
    iziToast.error({
        title: 'error',
        message: `Помилка при завантаженні зображень:, ${error.message}`,
        timeout: 3000,
        position: 'topRight',
      });
    return null;
  }
}
//отримати продукти по категорії
export async function getProductsFromCategory(category  ,page = 1) {
  try {
    const response = await axios.get(BASE_URL + '/category' + `/${category}`, {
      params: {
        limit: 12,
        skip: (page - 1) * 12,
      }
    });
    return response.data;
  } catch (error) {
    iziToast.error({
        title: 'error',
        message: `Помилка при завантаженні зображень:, ${error.message}`,
        timeout: 3000,
        position: 'topRight',
      });
    return null;
  }
}
