import React, { useEffect, useState } from 'react';
import { api } from '../api';

const AdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [productForm, setProductForm] = useState({ name: '', description: '', imageUrl: '', price: '', categoryId: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', publishedDate: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setMessage('خطا در دریافت دسته بندی ها'));
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addProduct({
        ...productForm,
        price: Number(productForm.price),
        categoryId: Number(productForm.categoryId),
      });
      setMessage('محصول جدید ثبت شد');
      setProductForm({ name: '', description: '', imageUrl: '', price: '', categoryId: '' });
    } catch (err) {
      setMessage('ثبت محصول با خطا مواجه شد');
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addCategory(categoryForm);
      const refreshed = await api.getCategories();
      setCategories(refreshed);
      setMessage('دسته بندی جدید ثبت شد');
      setCategoryForm({ name: '', description: '' });
    } catch (err) {
      setMessage('ثبت دسته بندی با خطا مواجه شد');
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addBlog(blogForm);
      setMessage('بلاگ جدید ثبت شد');
      setBlogForm({ title: '', excerpt: '', content: '', publishedDate: '' });
    } catch (err) {
      setMessage('ثبت بلاگ با خطا مواجه شد');
    }
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2>پنل مدیریت محتوا</h2>
        <p>افزودن محصول، دسته بندی و بلاگ</p>
      </div>
      {message && <div className="alert">{message}</div>}
      <div className="admin-grid">
        <form onSubmit={handleCategorySubmit} className="admin-form">
          <h3>دسته بندی جدید</h3>
          <label>
            عنوان
            <input value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} required />
          </label>
          <label>
            توضیحات
            <textarea value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} required />
          </label>
          <button type="submit">ثبت دسته بندی</button>
        </form>

        <form onSubmit={handleProductSubmit} className="admin-form">
          <h3>محصول جدید</h3>
          <label>
            عنوان محصول
            <input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
          </label>
          <label>
            توضیحات
            <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />
          </label>
          <label>
            لینک تصویر
            <input value={productForm.imageUrl} onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })} required />
          </label>
          <label>
            قیمت (تومان)
            <input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
          </label>
          <label>
            دسته بندی
            <select value={productForm.categoryId} onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })} required>
              <option value="">انتخاب کنید</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <button type="submit">ثبت محصول</button>
        </form>

        <form onSubmit={handleBlogSubmit} className="admin-form">
          <h3>بلاگ جدید</h3>
          <label>
            عنوان
            <input value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
          </label>
          <label>
            خلاصه
            <textarea value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} required />
          </label>
          <label>
            متن کامل
            <textarea value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} required rows="4" />
          </label>
          <label>
            تاریخ انتشار
            <input type="date" value={blogForm.publishedDate} onChange={(e) => setBlogForm({ ...blogForm, publishedDate: e.target.value })} required />
          </label>
          <button type="submit">ثبت بلاگ</button>
        </form>
      </div>
    </section>
  );
};

export default AdminPage;
