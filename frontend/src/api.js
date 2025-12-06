const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error('خطا در دریافت اطلاعات');
  }
  return response.json();
}

export const api = {
  getLatestProducts: () => fetchJson('/products/latest'),
  getProducts: () => fetchJson('/products'),
  getCategories: () => fetchJson('/categories'),
  getLatestCategories: () => fetchJson('/categories/latest'),
  getBlogs: () => fetchJson('/blogs'),
  getLatestBlogs: () => fetchJson('/blogs/latest'),
  getProductsByCategory: (categoryId) => fetchJson(`/categories/${categoryId}/products`),
  sendContact: (payload) => fetchJson('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  addProduct: (payload) => fetchJson('/admin/products', { method: 'POST', body: JSON.stringify(payload) }),
  addCategory: (payload) => fetchJson('/admin/categories', { method: 'POST', body: JSON.stringify(payload) }),
  addBlog: (payload) => fetchJson('/admin/blogs', { method: 'POST', body: JSON.stringify(payload) }),
};
