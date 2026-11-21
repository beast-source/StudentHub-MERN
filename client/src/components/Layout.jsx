import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() { logout(); navigate('/login'); }
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon">S</span><span>StudentHub</span></div>
      <p className="nav-label">WORKSPACE</p>
      <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>▦ &nbsp; Dashboard</NavLink>
      <NavLink to="/students" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>♙ &nbsp; Students</NavLink>
      <div className="sidebar-bottom">
        <div className="avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
        <div className="user-mini"><strong>{user?.name}</strong><small>{user?.email}</small></div>
        <button className="logout-icon" onClick={handleLogout} title="Logout">↪</button>
      </div>
    </aside>
    <main className="main-area">
      <header className="topbar"><span>Student Management</span><span className="top-user">Welcome, {user?.name}</span></header>
      <section className="page-content"><Outlet /></section>
    </main>
  </div>;
}
