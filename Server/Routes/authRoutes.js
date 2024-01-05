import { Router } from "express";
import { Signup,Signin, logout } from "../Controllers/authController.js";
const router=Router()

router.post('/signup',Signup)
router.post('/signin',Signin)
router.get('/logout',logout)

export default router