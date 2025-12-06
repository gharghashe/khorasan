import React, { useEffect, useState } from 'react';
import { api } from '../api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => setError('خطا در دریافت محصولات'));
    api.getCategories().then(setCategories).catch(() => setError('خطا در دریافت دسته بندی ها'));
  }, []);

  const filtered = selectedCategory
    ? products.filter((p) => p.categoryId === Number(selectedCategory))
    : products;

  return (
    <section className="card">
      <div className="card-header">
        <h2>محصولات</h2>
        <p>مرور و جستجوی تجهیزات</p>
        <div className="filters">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">همه دسته بندی ها</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <div className="alert">{error}</div>}
      <div className="card-grid">
        {filtered.map((product) => (
          <div className="card-item" key={product.id}>
            <div className="thumb" style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
            <h3>{product.name}</h3>
            <p className="muted">{product.description}</p>
            <p className="price">{product.price.toLocaleString()} تومان</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;
