import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { api.get('/students').then(r => setStudents(r.data)).catch(e => setError(e.response?.data?.message || 'Could not load students.')); }, []);
  const courses = new Set(students.map(s => s.course)).size;
  return <>
    <div className="page-heading"><div><p className="eyebrow">OVERVIEW</p><h1>Dashboard</h1><p className="muted">Here's what's happening with your students.</p></div><Link className="primary-btn" to="/students">＋ Add student</Link></div>
    {error && <p className="error">{error}</p>}
    <div className="stats-grid">
      <div className="stat-card"><span className="stat-icon purple">♙</span><p>Total students</p><strong>{students.length}</strong><small>Registered records</small></div>
      <div className="stat-card"><span className="stat-icon blue">▤</span><p>Courses</p><strong>{courses}</strong><small>Unique courses</small></div>
      <div className="stat-card"><span className="stat-icon green">✓</span><p>Academic years</p><strong>{new Set(students.map(s => s.year)).size}</strong><small>Years represented</small></div>
    </div>
    <div className="panel">
      <div className="panel-heading"><div><h2>Recent students</h2><p className="muted">Your latest student records</p></div><Link to="/students">View all →</Link></div>
      <StudentTable students={students.slice(0, 5)} />
    </div>
  </>;
}

function StudentTable({ students }) {
  if (!students.length) return <div className="empty-state">No student records yet. Add your first student to get started.</div>;
  return <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>COURSE</th><th>YEAR</th><th>EMAIL</th></tr></thead><tbody>
    {students.map(s => <tr key={s._id}><td><strong>{s.name}</strong></td><td>{s.course}</td><td>{s.year}</td><td>{s.email}</td></tr>)}
  </tbody></table></div>;
}
