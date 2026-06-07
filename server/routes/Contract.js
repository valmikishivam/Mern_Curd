import express from 'express'
import { addContract, contracts, deleteContract, updateContract } from '../controllers/User.js';
import checkAuth from '../utils/isAuth.js'
const router =express.Router()

router.post('/add',checkAuth,addContract);
router.put('/:id',checkAuth,updateContract)
router.delete('/:id',checkAuth,deleteContract)
router.get('/',checkAuth,contracts)

export default router