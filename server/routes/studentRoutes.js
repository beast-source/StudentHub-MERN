import { Router } from 'express';
import protect from '../middleware/authMiddleware.js';
import { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';

const router = Router();
router.use(protect);
router.route('/').get(getStudents).post(createStudent);
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);
export default router;
