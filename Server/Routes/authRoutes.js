import { Router } from "express";
import { signup,Signin, google, signout } from "../Controllers/authController.js";
const router=Router()

router.post('/signup',signup)
router.post('/signin',Signin)
router.get('/logout',signout)
router.post('/google',google)

export default router