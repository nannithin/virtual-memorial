import express from 'express';
import authRoutes from './login.js'
import TributeRoutes from './soliderroutes.js'

const router = express.Router();

router.use('/auth',authRoutes);
router.use('/',TributeRoutes);


export default router;