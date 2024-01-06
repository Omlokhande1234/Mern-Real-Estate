import { Router } from "express";
import { signup,Signin, logout } from "../Controllers/authController.js";
const router=Router()

router.post('/signup',signup)
router.post('/signin',Signin)
router.get('/logout',logout)

export default router