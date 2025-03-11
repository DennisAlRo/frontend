const BASE_URL = "http://localhost:4000";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function fetchCart() {
  const res = await fetch(`${BASE_URL}/cart`);
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
}
