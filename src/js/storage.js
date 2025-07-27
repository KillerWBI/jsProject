
const Wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
const Cart = JSON.parse(localStorage.getItem('cart')) || [];


export function AddLocalStorageSet(key, id) {
   const items = JSON.parse(localStorage.getItem(key)) || [];
 if (!items.includes(id)) {
    items.push(id); // ➕ добавляет В КОНЕЦ
    localStorage.setItem(key, JSON.stringify(items));
  }
}

export function removeFromStorage(key, id) {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  const filtered = items.filter(item => item !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
}

export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function shearId(key , id) {

  if (key.includes(id)) {
  return true;
} else {
  return false;
}

}
