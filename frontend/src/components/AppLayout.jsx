import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from './Logo.jsx';

const AppLayout = () => {
  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-content">
          <div className="hero-brand">
            <Logo />
            <div>
              <p className="brand-title">بازار لوازم برقی خراسان</p>
              <p className="brand-subtitle">پخش تجهیزات برقی، روشنایی و ابزار صنعتی</p>
            </div>
          </div>
          <nav className="nav">
            <NavLink to="/" end>خانه</NavLink>
            <NavLink to="/products">محصولات</NavLink>
            <NavLink to="/categories">دسته بندی ها</NavLink>
            <NavLink to="/blog">بلاگ</NavLink>
            <NavLink to="/contact">تماس با ما</NavLink>
            <NavLink to="/admin" className="admin-link">مدیریت محتوا</NavLink>
          </nav>
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>تمامی حقوق محفوظ است - الهام گرفته از طراحی سایت برق سان</p>
      </footer>
    </div>
  );
};

export default AppLayout;
