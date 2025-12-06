import React, { useEffect, useState } from 'react';
import { api } from '../api';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getBlogs().then(setBlogs).catch(() => setError('خطا در دریافت بلاگ'));
  }, []);

  return (
    <section className="card">
      <div className="card-header">
        <h2>بلاگ</h2>
        <p>آخرین مقالات و اطلاعیه ها</p>
      </div>
      {error && <div className="alert">{error}</div>}
      <div className="card-grid blog-grid">
        {blogs.map((blog) => (
          <article className="card-item" key={blog.id}>
            <h3>{blog.title}</h3>
            <p className="muted">{blog.excerpt}</p>
            <p className="meta">تاریخ انتشار: {blog.publishedDate}</p>
            <p>{blog.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
