import mongoose from 'mongoose';
import Student from '../models/Student.js';

const fields = ['name', 'email', 'course', 'year', 'phone'];

export async function getStudents(req, res) {
  const students = await Student.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(students);
}

export async function getStudent(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid student ID.' });
  const student = await Student.findOne({ _id: req.params.id, owner: req.userId });
  if (!student) return res.status(404).json({ message: 'Student not found.' });
  res.json(student);
}

export async function createStudent(req, res) {
  const data = Object.fromEntries(fields.map(key => [key, req.body[key]]));
  if (fields.slice(0, 4).some(key => !String(data[key] || '').trim())) {
    return res.status(400).json({ message: 'Name, email, course and year are required.' });
  }
  const student = await Student.create({ ...data, owner: req.userId });
  res.status(201).json(student);
}

export async function updateStudent(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid student ID.' });
  const data = Object.fromEntries(fields.filter(key => key in req.body).map(key => [key, req.body[key]]));
  const student = await Student.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId }, data,
    { new: true, runValidators: true }
  );
  if (!student) return res.status(404).json({ message: 'Student not found.' });
  res.json(student);
}

export async function deleteStudent(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid student ID.' });
  const student = await Student.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!student) return res.status(404).json({ message: 'Student not found.' });
  res.json({ message: 'Student deleted successfully.' });
}
