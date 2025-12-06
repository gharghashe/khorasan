import React, { useEffect, useState } from 'react';
import { api } from '../api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setError('خطا در دریافت دسته بندی ها'));
  }, []);

  return (
    <section className="card">
      <div className="card-header">
        <h2>دسته بندی ها</h2>
        <p>نمایش گروه بندی محصولات</p>
      </div>
      {error && <div className="alert">{error}</div>}
      <div className="card-grid categories">
        {categories.map((category) => (
          <div className="card-item" key={category.id}>
            <h3>{category.name}</h3>
            <p className="muted">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
