import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      if (isRegister) await register(form); else await login({ email: form.email, password: form.password });
      navigate('/');
    } catch (err) { setError(err.response?.data?.message || 'Something went wrong. Check the server connection.'); }
    finally { setLoading(false); }
  }

  return <div className="auth-page">
    <div className="auth-card">
      <div className="auth-logo">S</div>
      <h1>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
      <p className="muted">{isRegister ? 'Get started with StudentHub today.' : 'Sign in to manage your student records.'}</p>
      <form onSubmit={submit}>
        {isRegister && <label>Full name<input name="name" value={form.name} onChange={change} placeholder="Your name" required /></label>}
        <label>Email address<input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required /></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={change} placeholder="At least 6 characters" minLength="6" required /></label>
        {error && <p className="error">{error}</p>}
        <button className="primary-btn full-btn" disabled={loading}>{loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}</button>
      </form>
      <p className="auth-switch">{isRegister ? 'Already have an account?' : "Don't have an account?"} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Register'}</Link></p>
    </div>
  </div>;
}
