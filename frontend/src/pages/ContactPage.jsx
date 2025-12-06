import React, { useState } from 'react';
import { api } from '../api';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await api.sendContact(form);
      setStatus('پیام شما ثبت شد. به زودی با شما تماس می‌گیریم.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('ارسال پیام با مشکل مواجه شد.');
    }
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2>تماس با ما</h2>
        <p>راه های ارتباط با مجموعه خراسان</p>
      </div>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            نام و نام خانوادگی
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            ایمیل
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            پیام شما
            <textarea name="message" value={form.message} onChange={handleChange} required rows="4"></textarea>
          </label>
          <button type="submit">ارسال پیام</button>
          {status && <p className="muted">{status}</p>}
        </form>
        <div className="contact-info">
          <h3>اطلاعات تماس</h3>
          <p>تلفن: ۰۲۱-۴۴۰۰۰۰۰۰</p>
          <p>آدرس: مشهد، بلوار برق، پلاک ۱۲۳</p>
          <p>ساعات پاسخگویی: همه روزه ۸ الی ۱۸</p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
