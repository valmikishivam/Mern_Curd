import express from 'express';
import { isLogged, login, logout, register } from '../controllers/auth.js'
const router = express.Router();
 router.post('/register', register)
 router.post('/login', login)
 router.get('/logout', logout)
router.get('/me',isLogged)


export default router;