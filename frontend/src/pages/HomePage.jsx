import React, { useEffect, useState } from 'react';
import { api } from '../api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.getLatestProducts(),
      api.getLatestCategories(),
      api.getLatestBlogs(),
    ])
      .then(([latestProducts, latestCategories, latestBlogs]) => {
        setProducts(latestProducts);
        setCategories(latestCategories);
        setBlogs(latestBlogs);
      })
      .catch(() => setError('خطا در دریافت اطلاعات صفحه اصلی'));
  }, []);

  return (
    <div className="grid">
      {error && <div className="alert">{error}</div>}
      <section className="card">
        <div className="card-header">
          <h2>محصولات جدید</h2>
          <p>جدیدترین کالاهای اضافه شده</p>
        </div>
        <div className="card-grid">
          {products.map((product) => (
            <div className="card-item" key={product.id}>
              <div className="thumb" style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
              <h3>{product.name}</h3>
              <p className="muted">{product.description}</p>
              <p className="price">{product.price.toLocaleString()} تومان</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>دسته بندی های اخیر</h2>
          <p>موضوعات پر بازدید</p>
        </div>
        <div className="card-grid categories">
          {categories.map((category) => (
            <div className="card-item" key={category.id}>
              <h3>{category.name}</h3>
              <p className="muted">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>آخرین بلاگ</h2>
          <p>اخبار و نکات فنی</p>
        </div>
        <div className="card-grid blog-grid">
          {blogs.map((blog) => (
            <article className="card-item" key={blog.id}>
              <h3>{blog.title}</h3>
              <p className="muted">{blog.excerpt}</p>
              <p className="meta">تاریخ: {blog.publishedDate}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
