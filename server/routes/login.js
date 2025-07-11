import express from 'express';
import { admin, getAllTri, isAdmin, Login } from '../controllers/login.js';
import { Verify } from '../middleware/verify.js';

const router = express.Router();

router.post('/login',Login);
router.post('/checklog',admin);
router.get('/getall',Verify, getAllTri);
router.get('/isadmin',Verify,isAdmin)

export default router;