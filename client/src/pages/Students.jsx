import { useEffect, useState } from 'react';
import api from '../api';

const empty = { name: '', email: '', course: '', year: '1st Year', phone: '' };

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  async function loadStudents() {
    try { const { data } = await api.get('/students'); setStudents(data); }
    catch (e) { setError(e.response?.data?.message || 'Unable to load records.'); }
  }
  useEffect(() => { loadStudents(); }, []);

  function startAdd() { setEditingId(null); setForm(empty); setError(''); setSuccess(''); setShowForm(true); }
  function startEdit(s) {
    setEditingId(s._id);
    setForm({ name: s.name, email: s.email, course: s.course, year: s.year, phone: s.phone || '' });
    setError(''); setSuccess(''); setShowForm(true);
  }
  async function submit(e) {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      if (editingId) await api.put(`/students/${editingId}`, form);
      else await api.post('/students', form);
      setSuccess(editingId ? 'Student updated successfully.' : 'Student added successfully.');
      setForm(empty); setEditingId(null); setShowForm(false); await loadStudents();
    } catch (e) { setError(e.response?.data?.message || 'Could not save student.'); }
  }
  async function remove(id) {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try { await api.delete(`/students/${id}`); setSuccess('Student deleted successfully.'); await loadStudents(); }
    catch (e) { setError(e.response?.data?.message || 'Could not delete student.'); }
  }
  const filtered = students.filter(s => `${s.name} ${s.email} ${s.course}`.toLowerCase().includes(search.toLowerCase()));

  return <>
    <div className="page-heading"><div><p className="eyebrow">RECORD MANAGEMENT</p><h1>Students</h1><p className="muted">Add, view, edit and manage student records.</p></div><button className="primary-btn" onClick={startAdd}>＋ Add student</button></div>
    {error && <p className="error notice">{error}</p>}{success && <p className="success notice">{success}</p>}
    {showForm && <div className="panel form-panel"><div className="panel-heading"><h2>{editingId ? 'Edit student' : 'Add new student'}</h2><button className="text-btn" onClick={() => setShowForm(false)}>✕ Close</button></div>
      <form className="student-form" onSubmit={submit}>
        <label>Full name<input value={form.name} onChange={e => setForm({...form, name:e.target.value})} required /></label>
        <label>Email<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required /></label>
        <label>Course<input value={form.course} onChange={e => setForm({...form, course:e.target.value})} placeholder="e.g. BCA" required /></label>
        <label>Academic year<select value={form.year} onChange={e => setForm({...form, year:e.target.value})}><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></label>
        <label>Phone number<input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} /></label>
        <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-btn">{editingId ? 'Save changes' : 'Add student'}</button></div>
      </form>
    </div>}
    <div className="panel">
      <div className="list-toolbar"><div><h2>All students <span className="count-pill">{students.length}</span></h2><p className="muted">Search and manage your records</p></div><input className="search-input" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      {!filtered.length ? <div className="empty-state">{students.length ? 'No matching students found.' : 'No students added yet.'}</div> :
      <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>COURSE</th><th>YEAR</th><th>EMAIL</th><th>PHONE</th><th>ACTIONS</th></tr></thead><tbody>
        {filtered.map(s => <tr key={s._id}><td><strong>{s.name}</strong></td><td>{s.course}</td><td>{s.year}</td><td>{s.email}</td><td>{s.phone || '—'}</td><td><div className="actions"><button className="edit-btn" onClick={() => startEdit(s)}>Edit</button><button className="delete-btn" onClick={() => remove(s._id)}>Delete</button></div></td></tr>)}
      </tbody></table></div>}
    </div>
  </>;
}
