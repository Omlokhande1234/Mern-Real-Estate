import { Router } from "express";
import { signup,Signin, logout, google } from "../Controllers/authController.js";
const router=Router()

router.post('/signup',signup)
router.post('/signin',Signin)
router.get('/logout',logout)
router.post('/google',google)

export default router