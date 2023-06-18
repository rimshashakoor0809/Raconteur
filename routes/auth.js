import express from 'express';
import { login, register } from '../controllers/authController.js';
import upload from '../utils/uploadFile.js';

const router = express.Router();

/* GET users listing. */
router
  .post('/register',
    upload.single('picture'),
    register);

router
  .post('/login',
    login);
  

export default router;