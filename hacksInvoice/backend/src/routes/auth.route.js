import express from 'express';
import { signUp, logIn, logOut, authCheck } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';  //auth check middleware

const router = express.Router();

router.get('/check-auth',verifyToken,authCheck); //auth check route with cookie middleware
router.post('/signUp', signUp); //signup route  
router.post('/logout',logOut ); //logout route
router.post('/login', logIn); //login route


export default router;