


// Функции для работы с LocalStorage
export function AddLocalStorageSet(key, id) {
   const items = JSON.parse(localStorage.getItem(key)) || [];
   const count = document.querySelector(`[data-${key}-count]`);
 if (!items.includes(id)) {
    items.push(id); // ➕ добавляет В КОНЕЦ
    localStorage.setItem(key, JSON.stringify(items));
    count.textContent = items.length; // Обновляем счетчик

  }
}
// Функция для подсчета количества элементов в LocalStorage
export function countLocalStorage(key) {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  const count = document.querySelector(`[data-${key}-count]`);
  if (count) {
    count.textContent = items.length; // Обновляем счетчик
  }
}
// Функция для удаления в LocalStorage
export function removeFromStorage(key, id) {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  const count = document.querySelector(`[data-${key}-count]`);
  const filtered = items.filter(item => item !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
   count.textContent -= 1; // Обновляем счетчик
}
// Функция для получения из LocalStorage
export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// Функция для проверки наличия id в LocalStorage
export function shearId(key , id) {

  const data = JSON.parse(localStorage.getItem(key)) || [];
  return data.includes(id);
}
export function CleanLocalStorage() {
  localStorage.clear();
}
