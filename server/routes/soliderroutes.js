import express from 'express';
import { addTribute, getLim, getSingleTri } from '../controllers/soldiercontroller.js';

const router = express.Router();

router.post('/add',addTribute);
router.get('/getone/:id',getSingleTri);

router.get('/getlim',getLim);


export default router;