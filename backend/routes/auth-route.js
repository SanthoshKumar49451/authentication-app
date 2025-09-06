import express, { Router } from 'express'
import { logIn, logOut, signUP,verifyEmail,forgotPassword,resetPassword,checkAuth } from '../controllers/authController.js'
import { verifyToken } from '../middleware/verifyToken.js'



const router=Router()

router.post('/signup',signUP)
router.post('/login',logIn)
router.post('/logout',logOut)
router.post('/verify-email',verifyEmail)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get('/check-auth',verifyToken,checkAuth)




export default router